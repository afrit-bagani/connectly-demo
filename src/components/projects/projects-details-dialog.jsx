import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FiGithub,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiGlobe,
  FiDollarSign,
} from "react-icons/fi";

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
  getMatches,
}) {
  if (!project) return null;
  const matches = getMatches(project);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">{project.title}</DialogTitle>
          <DialogDescription className="capitalize">
            {project.domain.replace("-", " ")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>

          <Separator />

          <section
            aria-label="links"
            className="flex flex-wrap items-center gap-4 text-sm"
          >
            {project.githubRepo ? (
              <a
                className="underline hover:no-underline inline-flex items-center gap-1"
                href={project.githubRepo}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub aria-hidden /> GitHub
              </a>
            ) : null}
            {project.projectLink ? (
              <a
                className="underline hover:no-underline inline-flex items-center gap-1"
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink aria-hidden /> Live site
              </a>
            ) : null}
          </section>

          <section aria-label="owner" className="space-y-2">
            <h4 className="text-sm font-medium">Owner & contact</h4>
            <div className="text-sm">
              <div>
                <strong className="text-foreground">{project.owner}</strong>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {project.ownerContact.email ? (
                  <div className="inline-flex items-center gap-1 text-muted-foreground">
                    <FiMail aria-hidden /> {project.ownerContact.email}
                  </div>
                ) : null}
                {project.ownerContact.phone ? (
                  <div className="inline-flex items-center gap-1 text-muted-foreground">
                    <FiPhone aria-hidden /> {project.ownerContact.phone}
                  </div>
                ) : null}
                {project.ownerContact.website ? (
                  <a
                    className="underline hover:no-underline inline-flex items-center gap-1"
                    href={project.ownerContact.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiGlobe aria-hidden /> {project.ownerContact.website}
                  </a>
                ) : null}
              </div>
            </div>
          </section>

          {project.needsFinancialSupport ? (
            <section aria-label="funding" className="space-y-2">
              <h4 className="text-sm font-medium inline-flex items-center gap-2">
                <FiDollarSign aria-hidden />
                Funding enabled
              </h4>
              <div className="text-xs text-muted-foreground">
                This project will also appear on the Donations page.
              </div>
              <div className="rounded-md border p-3 bg-card">
                {project.paymentDetails?.method === "bank" ? (
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Bank name
                      </dt>
                      <dd className="text-sm">
                        {project.paymentDetails.bankName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">IFSC</dt>
                      <dd className="text-sm">{project.paymentDetails.ifsc}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-xs text-muted-foreground">
                        Account number
                      </dt>
                      <dd className="text-sm">
                        {project.paymentDetails.accountNumber}
                      </dd>
                    </div>
                  </dl>
                ) : project.paymentDetails?.method === "upi" ? (
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        UPI ID
                      </div>
                      <div className="text-sm">
                        {project.paymentDetails.upiId}
                      </div>
                    </div>
                    {project.paymentDetails.qrImageUrl ? (
                      <img
                        src={
                          project.paymentDetails.qrImageUrl ||
                          "/placeholder.svg"
                        }
                        alt="UPI QR code"
                        className="w-48 h-48 object-contain rounded-md border"
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          <section aria-label="matches">
            <h4 className="text-sm font-medium mb-2">Suggested contributors</h4>
            {matches.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No matching profiles yet.
              </div>
            ) : (
              <ul className="space-y-2">
                {matches.map((m) => (
                  <li key={m.profile.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{m.profile.name}</div>
                      <Badge variant="secondary">{m.score} skill match</Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Overlap: {m.overlap.join(", ")}
                    </div>
                    <div className="mt-2 text-xs">
                      {m.profile.contact.email ? (
                        <span className="mr-3">
                          Email: {m.profile.contact.email}
                        </span>
                      ) : null}
                      {m.profile.contact.website ? (
                        <a
                          className="underline hover:no-underline"
                          href={m.profile.contact.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Website
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
