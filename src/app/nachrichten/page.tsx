diff --git a/src/app/nachrichten/page.tsx b/src/app/nachrichten/page.tsx
index e5829c30be197ea9268078315f7990868de24a23..a8f5a2a385da5e55164db2f0a2190878f4d44a61 100644
--- a/src/app/nachrichten/page.tsx
+++ b/src/app/nachrichten/page.tsx
@@ -1,28 +1,27 @@
 import Link from "next/link";
 import { cookies } from "next/headers";
-import { prisma } from "@/lib/prisma";
 import { sessionCookie, verifySession } from "@/lib/auth";
 
 export default async function NachrichtenPage() {
   const cookieStore = await cookies();
   const token = cookieStore.get(sessionCookie.name)?.value;
 
   if (!token) {
     return (
       <main className="mx-auto max-w-3xl px-6 py-10">
         <h1 className="text-2xl font-bold">Nachrichten</h1>
         <p className="mt-2 text-slate-600">Du bist nicht eingeloggt.</p>
         <Link className="mt-4 inline-block underline" href="/login">
           Zum Login
         </Link>
       </main>
     );
   }
 
   try {
     await verifySession(token);
   } catch {
     return (
       <main className="mx-auto max-w-3xl px-6 py-10">
         <h1 className="text-2xl font-bold">Nachrichten</h1>
         <p className="mt-2 text-slate-600">Session abgelaufen. Bitte neu einloggen.</p>
@@ -33,26 +32,26 @@ export default async function NachrichtenPage() {
     );
   }
 
   return (
     <main className="mx-auto max-w-3xl px-6 py-10">
       <div className="flex items-baseline justify-between gap-4">
         <div>
           <h1 className="text-2xl font-bold">Nachrichten</h1>
           <p className="mt-1 text-slate-600">
             Chat/DM kommt als nächstes (Threads + Inbox).
           </p>
         </div>
         <Link className="text-sm underline" href="/me">
           Zurück
         </Link>
       </div>
 
       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-700">
         <div className="font-semibold">Platzhalter</div>
         <p className="mt-2 text-sm text-slate-600">
           Hier bauen wir später: Konversationen, neue Nachricht, ungelesen-Zähler, usw.
         </p>
       </div>
     </main>
   );
-}
\ No newline at end of file
+}
