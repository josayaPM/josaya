diff --git a/src/app/api/auth/register/route.ts b/src/app/api/auth/register/route.ts
index ebb20b06e364226827e8ea387115328eca018b6d..3e04c5d9f642f80ec0b7e03323ab04e6d7ed4581 100644
--- a/src/app/api/auth/register/route.ts
+++ b/src/app/api/auth/register/route.ts
@@ -8,35 +8,36 @@ export async function POST(req: Request) {
     const email = String(body.email ?? "").trim().toLowerCase();
     const password = String(body.password ?? "");
 
     if (!email || !password || password.length < 6) {
       return NextResponse.json(
         { error: "Bitte Email und Passwort (mind. 6 Zeichen) angeben." },
         { status: 400 }
       );
     }
 
     const passwordHash = await hashPassword(password);
 
     const user = await prisma.user.create({
       data: { email, passwordHash },
       select: { id: true, email: true },
     });
 
     const token = await signSession({ userId: user.id, email: user.email });
 
     const res = NextResponse.json({ ok: true, user });
     res.cookies.set(sessionCookie.name, token, {
       ...sessionCookie.options,
       maxAge: 60 * 60 * 24 * 7,
     });
     return res;
-  } catch (e: any) {
-    if (e?.code === "P2002") {
+  } catch (error: unknown) {
+    const prismaError = error as { code?: string } | null;
+    if (prismaError?.code === "P2002") {
       return NextResponse.json(
         { error: "Email ist schon registriert." },
         { status: 409 }
       );
     }
     return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
   }
-}
\ No newline at end of file
+}
