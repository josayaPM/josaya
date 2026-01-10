export const demoProfessors = [
  { id: "demo-prof", name: "Prof. Demo", department: "Informatik", school: "Demo-Uni" },
  { id: "mueller", name: "Prof. Müller", department: "Mathe", school: "Demo-Uni" },
  { id: "nguyen", name: "Prof. Nguyen", department: "BWL", school: "Demo-Uni" },
];

export function getDemoProfessorById(id: string) {
  return demoProfessors.find((p) => p.id === id) ?? null;
}