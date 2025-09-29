import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FiUpload } from "react-icons/fi";

export function CreateProjectForm({ onCreate }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [projectLink, setProjectLink] = React.useState("");
  const [githubRepo, setGithubRepo] = React.useState("");
  const options = [
    "development",
    "ai-ml",
    "data-science",
    "cyber-security",
    "other",
  ];
  const [domain, setDomain] = React.useState(options[0]);
  const [skills, setSkills] = React.useState([]);
  const [skillDraft, setSkillDraft] = React.useState("");

  const [needsFunding, setNeedsFunding] = React.useState(false);
  const [fundMethod, setFundMethod] = React.useState("bank");
  // Bank
  const [bankName, setBankName] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");

  // UPI
  const [upiId, setUpiId] = React.useState("");
  const [qrFile, setQrFile] = React.useState("");
  const [qrPreview, setQrPreview] = React.useState("");

  React.useEffect(() => {
    if (!qrFile) {
      setQrPreview("");
      return;
    }
    const url = URL.createObjectURL(qrFile);
    setQrPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [qrFile]);

  function addSkill() {
    const s = skillDraft.trim();
    if (!s) return;
    if (!skills.includes(s)) setSkills((prev) => [...prev, s]);
    setSkillDraft("");
  }

  function removeSkill(s) {
    setSkills((prev) => prev.filter((x) => x !== s));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const base = {
      id: "temp",
      title,
      description,
      owner,
      ownerContact: {
        email: email || undefined,
        website: website || undefined,
      },
      projectLink: projectLink || undefined,
      githubRepo: githubRepo || undefined,
      domain,
      skills,
      needsFinancialSupport: needsFunding,
    };

    let paymentDetails = undefined;
    if (needsFunding) {
      if (fundMethod === "bank") {
        paymentDetails = { method: "bank", bankName, ifsc, accountNumber };
      } else {
        paymentDetails = {
          method: "upi",
          upiId,
          qrImageUrl: qrPreview || undefined,
        };
      }
    }

    toast.success("Project created");
    onCreate({ ...base, paymentDetails });

    // Reset
    setTitle("");
    setDescription("");
    setOwner("");
    setEmail("");
    setWebsite("");
    setProjectLink("");
    setGithubRepo("");
    setDomain("development");
    setSkills([]);
    setSkillDraft("");
    setNeedsFunding(false);
    setFundMethod("bank");
    setBankName("");
    setIfsc("");
    setAccountNumber("");
    setUpiId("");
    setQrFile(null);
    setQrPreview("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Project title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Realtime Chat App"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Your name"
            className="mt-1"
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What are you building?"
            className="mt-1"
            rows={3}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Contact email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@example.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="website">Owner website</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://your.site"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="projectLink">Project link</Label>
          <Input
            id="projectLink"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="https://demo.example.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="githubRepo">GitHub repo</Label>
          <Input
            id="githubRepo"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
            placeholder="https://github.com/user/repo"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Domain</Label>
          <Select value={domain} onValueChange={(v) => setDomain(v)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Choose domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="ai-ml">AI/ML</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="cyber-security">Cyber Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="skillDraft">Skills needed</Label>
          <div className="mt-1 flex gap-2">
            <Input
              id="skillDraft"
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              placeholder="e.g., react"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={addSkill}>
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => removeSkill(s)}
                className="group"
                aria-label={`Remove ${s}`}
                title="Click to remove"
              >
                <Badge variant="outline" className="group-hover:line-through">
                  {s}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md border p-4 bg-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="needsFunding" className="text-base">
              Need financial support?
            </Label>
            <p className="text-xs text-muted-foreground">
              Enable funding to show “Fund this project” and list on the
              Donations page.
            </p>
          </div>
          <Switch
            id="needsFunding"
            checked={needsFunding}
            onCheckedChange={setNeedsFunding}
          />
        </div>

        {needsFunding ? (
          <div className="mt-4 space-y-3">
            <div>
              <Label>Payment method</Label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`border rounded-md p-3 text-left ${
                    fundMethod === "bank" ? "ring-2 ring-ring" : ""
                  }`}
                  onClick={() => setFundMethod("bank")}
                >
                  Bank transfer
                </button>
                <button
                  type="button"
                  className={`border rounded-md p-3 text-left ${
                    fundMethod === "upi" ? "ring-2 ring-ring" : ""
                  }`}
                  onClick={() => setFundMethod("upi")}
                >
                  UPI
                </button>
              </div>
            </div>

            {fundMethod === "bank" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank name</Label>
                  <Input
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g., HDFC"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC code</Label>
                  <Input
                    id="ifsc"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    placeholder="e.g., HDFC0001234"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="accountNumber">Account number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="XXXXXXXXXXXX"
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@okbank"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="qrFile"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-slate-50"
                  >
                    <FiUpload /> QR code image
                  </Label>
                  <input
                    id="qrFile"
                    type="file"
                    accept="image/*"
                    hidden
                    className="mt-1 block text-sm"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setQrFile(file);
                    }}
                  />
                  <div className="mt-2">
                    {qrPreview ? (
                      <img
                        src={
                          qrPreview ||
                          "/placeholder.svg?height=200&width=200&query=upi-qr-code-preview"
                        }
                        alt="UPI QR preview"
                        className="w-40 h-40 object-contain rounded-md border"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md border bg-slate-50" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create project</Button>
      </div>
    </form>
  );
}
