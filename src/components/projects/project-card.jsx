import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FiGithub, FiExternalLink, FiDollarSign, FiUser } from "react-icons/fi";

export function ProjectCard({ project, matches, onViewDetails, onFund }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-balance">{project.title}</CardTitle>
            <CardDescription className="capitalize">
              {project.domain.replace("-", " ")}
            </CardDescription>
          </div>
          {project.needsFinancialSupport ? (
            <Badge variant="secondary" className="gap-1">
              <FiDollarSign aria-hidden /> Donation eligible
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((s) => (
            <Badge
              key={s}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {s}
            </Badge>
          ))}
        </div>

        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <FiUser aria-hidden />
            <span>
              Owner:{" "}
              <strong className="text-foreground">{project.owner}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {project.githubRepo ? (
              <a
                className="text-sm underline hover:no-underline flex items-center gap-1"
                href={project.githubRepo}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub aria-hidden /> GitHub
              </a>
            ) : null}
            {project.projectLink ? (
              <a
                className="text-sm underline hover:no-underline flex items-center gap-1"
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink aria-hidden /> Live
              </a>
            ) : null}
          </div>
        </div>

        {matches.length > 0 ? (
          <div className="pt-2">
            <div className="text-xs text-muted-foreground mb-1">
              Suggested contributors
            </div>
            <div className="flex flex-wrap gap-2">
              {matches.map((m) => (
                <Badge
                  key={m.profile.id}
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  {m.profile.name} • {m.score}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-2">
        <Button variant="secondary" onClick={onViewDetails}>
          View details
        </Button>
        {project.needsFinancialSupport ? (
          <Button variant="default" onClick={onFund} className="gap-2">
            <FiDollarSign aria-hidden />
            Fund this project
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
