import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim();

  if (!q) {
    return NextResponse.json({ professors: [], schools: [] }, { status: 200 });
  }

  // 1) Schools
  const schools = await prisma.school.findMany({
    where: {
      name: { contains: q, mode: "insensitive" },
    },
    orderBy: { name: "asc" },
    take: 8,
    select: {
      id: true,
      name: true,
      city: true,
      state: true,
    },
  });

  // 2) Professors (inkl. Department->School)
  const professorsRaw = await prisma.professor.findMany({
    where: {
      name: { contains: q, mode: "insensitive" },
    },
    orderBy: { name: "asc" },
    take: 12,
    select: {
      id: true,
      name: true,
      department: {
        select: {
          id: true,
          name: true,
          school: { select: { id: true, name: true } },
        },
      },
    },
  });

  const profIds = professorsRaw.map((p) => p.id);

  // 3) Rating-Stats in einem Rutsch (avg + count)
  const stats = profIds.length
    ? await prisma.rating.groupBy({
        by: ["professorId"],
        where: { professorId: { in: profIds } },
        _avg: { stars: true },
        _count: { _all: true },
      })
    : [];

  const statsMap = new Map(
    stats.map((s) => [
      s.professorId,
      { avg: s._avg.stars ?? 0, count: s._count._all ?? 0 },
    ])
  );

  const professors = professorsRaw.map((p) => {
    const st = statsMap.get(p.id) ?? { avg: 0, count: 0 };
    return {
      id: p.id,
      name: p.name,
      departmentName: p.department?.name ?? null,
      schoolId: p.department?.school?.id ?? null,
      schoolName: p.department?.school?.name ?? null,
      avgStars: st.avg,
      ratingCount: st.count,
    };
  });

  return NextResponse.json({ professors, schools }, { status: 200 });
}