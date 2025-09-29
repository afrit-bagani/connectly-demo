import AppNavbar from "@/components/AppNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { successStories, announcements } from "@/data/updates";

export default function UpdatesPage() {
  const items = [
    { group: "Success Stories", data: successStories },
    { group: "Announcements", data: announcements },
  ];

  return (
    <>
      <AppNavbar />
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Updates & Success Stories</h1>
          <p className="text-muted-foreground">
            Celebrate alumni milestones and stay informed about institute
            updates.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((section) => (
            <Card key={section.group}>
              <CardHeader>
                <CardTitle>{section.group}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {section.data.map((u) => (
                  <div key={u.id} className="rounded border p-3">
                    <div className="font-medium">{u.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {u.summary}
                    </div>
                    <div className="text-[11px] opacity-70 mt-1">
                      {new Date(u.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
