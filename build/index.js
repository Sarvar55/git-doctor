import { askToAi } from './utils/ask-to-ai.js';
askToAi(`

diff --git a/src/app/chef/page.tsx b/src/app/chef/page.tsx
index ec7c5aa..210daa3 100644
--- a/src/app/chef/page.tsx
+++ b/src/app/chef/page.tsx
@@ -6,6 +6,7 @@ export default function page({}: Props) {

+	const names=["Sarvar","Ilkin","Omer"]

+	 const filter=()=>{
+	  return names.filter(name=>name.equals("Sarvar"))
+	}

   return (
     <div>
         <h1>merhaba</h1>
     </div>
   )
 }
-        `);
