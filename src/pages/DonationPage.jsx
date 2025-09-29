import { useMemo, useState } from "react";
import {
  FiHeart,
  FiShare2,
  FiPlus,
  FiCreditCard,
  FiSmartphone,
  FiUsers,
  FiTarget,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose, // close button component
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import AppNavbar from "@/components/AppNavbar";

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));
  } catch {
    return `₹${Number(n || 0).toLocaleString("en-IN")}`;
  }
}

function percent(raised, target) {
  const p = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
  return isFinite(p) ? p : 0;
}

const seeded = [
  {
    id: "i2",
    title: "Community Health Camp",
    description:
      "Support free health checkups and medicines for underserved communities.",
    image: "donation/community-health-camp.jpg",
    target: 80000,
    raised: 26500,
    contributors: 53,
    payment: {
      mode: "bank",
      bank: {
        bankName: "HDFC Bank",
        ifsc: "HDFC0001234",
        accountNumber: "012345678901",
      },
      qrImage: null,
    },
    category: "Healthcare",
  },
  {
    id: "i3",
    title: "Open Research Micro‑Grant",
    description:
      "Seed small research projects with quick impact. Open results, open data.",
    image: "donation/research-project-lab.jpg",
    target: 120000,
    raised: 72500,
    contributors: 89,
    payment: { mode: "upi", qrImage: "/donation/upi-qr-code.jpg", bank: null },
    category: "Research",
  },
  {
    id: "i4",
    title: "Clean Water for Villages",
    description:
      "Install handpumps and water filters in remote villages facing scarcity.",
    image: "donation/clean-water-drive.jpg",
    target: 90000,
    raised: 15000,
    contributors: 34,
    payment: { mode: "upi", qrImage: "/donation/upi-qr-code.jpg", bank: null },
    category: "Social Work",
  },
  {
    id: "i5",
    title: "STEM Kits for Schools",
    description:
      "Provide low-cost science kits and workshops for government schools.",
    image: "donation/stem-school-kits.jpg",
    target: 70000,
    raised: 21000,
    contributors: 41,
    payment: {
      mode: "bank",
      bank: {
        bankName: "SBI",
        ifsc: "SBIN0001111",
        accountNumber: "987654321000",
      },
      qrImage: null,
    },
    category: "Education",
  },
  {
    id: "i6",
    title: "Open-Source Climate Research",
    description:
      "Support data collection and open models for local climate adaptation.",
    image: "donation/climate-research.jpg",
    target: 150000,
    raised: 56000,
    contributors: 72,
    payment: { mode: "upi", qrImage: "/donation/upi-qr-code.jpg", bank: null },
    category: "Research",
  },
  {
    id: "i1",
    title: "Alumni Student Support Fund 2025–26",
    description:
      "Help students in need with tuition, books, and living expenses. Every rupee makes a difference.",
    image: "donation/helping-hand-illustration.jpg",
    target: 60000,
    raised: 1000,
    contributors: 1,
    payment: {
      mode: "upi",
      qrImage: "/donation/upi-qr-code.jpg",
      bank: null,
    },
    category: "Education",
  },
];

export default function DonationPage() {
  const [initiatives, setInitiatives] = useState(seeded);
  const [createOpen, setCreateOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Create Initiative form state
  const [cTitle, setCTitle] = useState("");
  const [cDesc, setCDesc] = useState("");
  const [cImage, setCImage] = useState(""); // DataURL
  const [cTarget, setCTarget] = useState("");
  const [cPaymentMode, setCPaymentMode] = useState("bank"); // "bank" | "qr"
  const [cBankName, setCBankName] = useState("");
  const [cIFSC, setCIFSC] = useState("");
  const [cAccount, setCAccount] = useState("");
  const [cQR, setCQR] = useState(""); // DataURL
  const [cCategory, setCCategory] = useState("Social Work");

  function fileToDataURL(file, cb) {
    const reader = new FileReader();
    reader.onload = (e) => cb(String(e.target?.result || ""));
    reader.readAsDataURL(file);
  }

  function onImagePick(e, setter) {
    const f = e.target.files?.[0];
    if (!f) return;
    fileToDataURL(f, (url) => setter(url));
  }

  function handleCreateInitiative(e) {
    e.preventDefault();
    const id = `i${Date.now()}`;
    const newOne = {
      id,
      title: cTitle || "Untitled Initiative",
      description: cDesc || "No description provided.",
      image: cImage || "/donation-initiative.jpg",
      target: Number(cTarget || 0),
      raised: 0,
      contributors: 0,
      payment:
        cPaymentMode === "bank"
          ? {
              mode: "bank",
              bank: {
                bankName: cBankName,
                ifsc: cIFSC,
                accountNumber: cAccount,
              },
              qrImage: cQR || null,
            }
          : {
              mode: "upi",
              qrImage: cQR || "/donation/upi-qr-code.jpg",
              bank: null,
            },
      category: cCategory || "General",
    };
    setInitiatives((prev) => [newOne, ...prev]);
    setCreateOpen(false);
    // reset form
    setCTitle("");
    setCDesc("");
    setCImage("");
    setCTarget("");
    setCPaymentMode("bank");
    setCBankName("");
    setCIFSC("");
    setCAccount("");
    setCQR("");
    setCCategory("Social Work");

    toast.success("Donation initiative is created", {
      description: "Waiting for admin approval",
    });
  }

  function openDonate(initiative) {
    setActive(initiative);
    setDonateOpen(true);
  }

  // Donate form state
  const [dAmount, setDAmount] = useState("");
  const [dName, setDName] = useState("");
  const [dEmail, setDEmail] = useState("");
  const [dPhone, setDPhone] = useState("");
  const [dAnon, setDAnon] = useState(false);
  const [dMethod, setDMethod] = useState("card"); // "card" | "upi"
  const [dCard, setDCard] = useState({
    number: "",
    exp: "",
    cvc: "",
    holder: "",
    country: "India",
    address: "",
  });

  function handleDonate(e) {
    e.preventDefault();
    const amt = Number(dAmount || 0);
    if (!active || !amt || amt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setInitiatives((prev) =>
      prev.map((it) =>
        it.id === active.id
          ? {
              ...it,
              raised: it.raised + amt,
              contributors: it.contributors + 1,
            }
          : it
      )
    );
    setDonateOpen(false);
    setDMethod("card");
    setDAmount("");
    setDName("");
    setDEmail("");
    setDPhone("");
    setDAnon(false);
    setDCard({
      number: "",
      exp: "",
      cvc: "",
      holder: "",
      country: "India",
      address: "",
    });
    toast.success("Thank you for your contribution !", {
      description: `You donated ${formatINR(amt)}${
        dAnon ? " (anonymous)" : ""
      }`,
    });
  }

  const colorPills = useMemo(
    () => ({
      Education: "bg-teal-100 text-teal-800",
      Healthcare: "bg-blue-100 text-blue-800",
      Research: "bg-amber-100 text-amber-900",
      "Social Work": "bg-emerald-100 text-emerald-800",
      General: "bg-slate-100 text-slate-800",
    }),
    []
  );

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-teal-50">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-balance">
                  Fund social work and research that matters
                </h2>
                <p className="text-slate-600 mt-2">
                  Create initiatives, share with your community, and collect
                  donations via UPI or bank.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                      <FiPlus className="mr-2" /> Create Initiative
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh]">
                    <CreateInitiativeForm
                      values={{
                        cTitle,
                        cDesc,
                        cImage,
                        cTarget,
                        cPaymentMode,
                        cBankName,
                        cIFSC,
                        cAccount,
                        cQR,
                        cCategory,
                      }}
                      set={{
                        setCTitle,
                        setCDesc,
                        setCImage,
                        setCTarget,
                        setCPaymentMode,
                        setCBankName,
                        setCIFSC,
                        setCAccount,
                        setCQR,
                        setCCategory,
                      }}
                      onImagePick={onImagePick}
                      onSubmit={handleCreateInitiative}
                    />
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                      >
                        <FiX className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* LIST */}
        <main className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid grid-cols-1 gap-6">
            {initiatives.map((it) => (
              <Card
                key={it.id}
                className="overflow-hidden shadow-sm border-0 ring-1 ring-slate-200"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[360px] w-full h-[220px] bg-slate-100 shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={it.image || "/placeholder.svg"}
                      alt={it.title}
                    />
                  </div>

                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle className="text-lg md:text-xl text-slate-900">
                          {it.title}
                        </CardTitle>
                        <p className="text-slate-600 text-sm md:text-base">
                          {it.description}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              colorPills[it.category] || colorPills["General"]
                            }`}
                          >
                            {it.category}
                          </span>
                        </div>
                      </div>
                      <button
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                        aria-label="Share"
                        title="Share"
                      >
                        <FiShare2 />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-slate-700">
                        <span>
                          {formatINR(it.raised)} raised of{" "}
                          {formatINR(it.target)} goal
                        </span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <FiUsers className="text-teal-600" />
                          <span>
                            {it.contributors}{" "}
                            {it.contributors === 1 ? "person" : "people"}{" "}
                            contributed
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <Progress
                          value={percent(it.raised, it.target)}
                          className="h-2 bg-orange-100"
                        />
                        <span className="text-xs font-medium text-slate-700 w-10 text-right">
                          {percent(it.raised, it.target)}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col md:flex-row items-center gap-3">
                      <Button
                        className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium"
                        onClick={() => openDonate(it)}
                      >
                        <FiHeart className="mr-2" />
                        Contribute Now
                      </Button>

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <FiTarget className="text-blue-600" /> Target
                        </span>
                        <span>{formatINR(it.target)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>

        <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh]">
            <DonateForm
              initiative={active}
              values={{ dAmount, dName, dEmail, dPhone, dAnon, dMethod, dCard }}
              set={{
                setDAmount,
                setDName,
                setDEmail,
                setDPhone,
                setDAnon,
                setDMethod,
                setDCard,
              }}
              onSubmit={handleDonate}
            />
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
              >
                <FiX className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}

/* -------------------- Subcomponents -------------------- */

function CreateInitiativeForm({ values, set, onImagePick, onSubmit }) {
  const {
    cTitle,
    cDesc,
    cImage,
    cTarget,
    cPaymentMode,
    cBankName,
    cIFSC,
    cAccount,
    cQR,
    cCategory,
  } = values;
  const {
    setCTitle,
    setCDesc,
    setCImage,
    setCTarget,
    setCPaymentMode,
    setCBankName,
    setCIFSC,
    setCAccount,
    setCQR,
    setCCategory,
  } = set;

  return (
    <form onSubmit={onSubmit} className="flex max-h-[90vh] flex-col">
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 px-6 pr-12 py-5 text-white top-0 z-20">
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center text-white/90 hover:text-white"
          >
            <FiX />
          </button>
        </DialogClose>
        <DialogHeader className="p-0">
          <DialogTitle className="text-white">
            Create Donation Initiative
          </DialogTitle>
          <DialogDescription className="text-white/90">
            Add initiative details and preferred payment method. You can use
            bank details or upload a UPI QR.
          </DialogDescription>
        </DialogHeader>
      </div>

      {/* keep single column form */}
      <div className="p-6 grid grid-cols-1 gap-5 overflow-y-auto">
        {/* left column content now first section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Community Library for Kids"
              value={cTitle}
              onChange={(e) => setCTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              rows={5}
              placeholder="Tell people why this initiative matters..."
              value={cDesc}
              onChange={(e) => setCDesc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="target">Target amount (INR)</Label>
              <Input
                id="target"
                type="number"
                min="0"
                placeholder="60000"
                value={cTarget}
                onChange={(e) => setCTarget(e.target.value)}
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select value={cCategory} onValueChange={setCCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Social Work">Social Work</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Cover image</Label>
            <div className="mt-2 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-slate-50">
                <FiUpload />
                <span>Upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onImagePick(e, setCImage)}
                />
              </label>
              {cImage ? (
                <div className="h-14 w-24 rounded-md overflow-hidden border">
                  <img
                    src={cImage || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-14 w-24 rounded-md overflow-hidden border bg-slate-50" />
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Payment method for this initiative</Label>
            <RadioGroup
              className="grid grid-cols-1 gap-3"
              value={cPaymentMode}
              onValueChange={setCPaymentMode}
            >
              <label
                className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${
                  cPaymentMode === "bank"
                    ? "ring-2 ring-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <RadioGroupItem value="bank" id="pm-bank" />
                <FiCreditCard className="text-orange-600" />
                <span className="font-medium">Bank</span>
              </label>
              <label
                className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${
                  cPaymentMode === "qr"
                    ? "ring-2 ring-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <RadioGroupItem value="qr" id="pm-qr" />
                <FiSmartphone className="text-teal-600" />
                <span className="font-medium">UPI QR</span>
              </label>
            </RadioGroup>

            {/* bank / qr fields unchanged structurally */}
            {cPaymentMode === "bank" ? (
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Bank name</Label>
                  <Input
                    placeholder="e.g. HDFC Bank"
                    value={cBankName}
                    onChange={(e) => setCBankName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>IFSC code</Label>
                  <Input
                    placeholder="e.g. HDFC0001234"
                    value={cIFSC}
                    onChange={(e) => setCIFSC(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Account number</Label>
                  <Input
                    placeholder="Enter account number"
                    value={cAccount}
                    onChange={(e) => setCAccount(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    Optional UPI QR (fallback)
                  </Label>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-slate-50">
                      <FiUpload />
                      <span>Upload QR</span>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onImagePick(e, setCQR)}
                      />
                    </label>
                    {cQR ? (
                      <img
                        src={cQR || "/placeholder.svg"}
                        alt="QR preview"
                        className="h-16 w-16 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md border bg-slate-50" />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Upload UPI QR</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-slate-50">
                      <FiUpload />
                      <span>Upload QR</span>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onImagePick(e, setCQR)}
                      />
                    </label>
                    {cQR ? (
                      <img
                        src={cQR || "/placeholder.svg"}
                        alt="QR preview"
                        className="h-20 w-20 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-md border bg-slate-50" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* sticky footer keeps actions visible on mobile */}
        <div className="px-6 pb-4 pt-3 sticky bottom-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t flex items-center justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-slate-700">
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Create initiative
          </Button>
        </div>
      </div>
    </form>
  );
}

function DonateForm({ initiative, values, set, onSubmit }) {
  if (!initiative) return null;
  const { dAmount, dName, dEmail, dPhone, dAnon, dMethod, dCard } = values;
  const {
    setDAmount,
    setDName,
    setDEmail,
    setDPhone,
    setDAnon,
    setDMethod,
    setDCard,
  } = set;
  const showQR = dMethod === "upi";

  return (
    <form onSubmit={onSubmit} className="flex max-h-[90vh] flex-col">
      <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 px-6 pr-12 py-5 text-white top-0 z-20">
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center text-white/90 hover:text-white"
          >
            <FiX />
          </button>
        </DialogClose>
        <DialogHeader className="p-0">
          <DialogTitle className="text-white">
            Donate to {initiative.title}
          </DialogTitle>
          <DialogDescription className="text-white/90">
            {formatINR(initiative.raised)} raised of{" "}
            {formatINR(initiative.target)} goal • {initiative.contributors}{" "}
            contributors
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="p-6 grid grid-cols-1 gap-6 overflow-y-auto">
        {/* donor details */}
        <div className="space-y-4">
          <div>
            <Label>Amount (INR)</Label>
            <Input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={dAmount}
              onChange={(e) => setDAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Your name"
                value={dName}
                onChange={(e) => setDName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={dEmail}
                  onChange={(e) => setDEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  placeholder="10-digit phone"
                  value={dPhone}
                  onChange={(e) => setDPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="anon"
              checked={dAnon}
              onCheckedChange={(v) => setDAnon(Boolean(v))}
            />
            <label htmlFor="anon" className="text-sm text-slate-700">
              Donate anonymously
            </label>
          </div>
        </div>

        {/* payment section */}
        <div className="space-y-4">
          <Label>Payment method</Label>
          <RadioGroup
            value={dMethod}
            onValueChange={setDMethod}
            className="space-y-4"
          >
            {/* Card option */}
            <div
              className={`rounded-lg border p-4 ${
                dMethod === "card" ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <RadioGroupItem value="card" id="pay-card" />
                <FiCreditCard className="text-blue-600" />
                <span className="font-medium">Card</span>
                <span className="ml-auto flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="px-1.5 py-0.5 rounded bg-white border">
                    VISA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border">
                    Mastercard
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border">
                    RuPay
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border">
                    Amex
                  </span>
                </span>
              </label>

              {dMethod === "card" && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {/* number/exp/cvc grouped and spaced */}
                  <div>
                    <Label>Card information</Label>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <Input
                        placeholder="1234 1234 1234 1234"
                        value={dCard.number}
                        onChange={(e) =>
                          setDCard({ ...dCard, number: e.target.value })
                        }
                      />
                      <Input
                        placeholder="MM / YY"
                        value={dCard.exp}
                        onChange={(e) =>
                          setDCard({ ...dCard, exp: e.target.value })
                        }
                      />
                      <Input
                        placeholder="CVC"
                        value={dCard.cvc}
                        onChange={(e) =>
                          setDCard({ ...dCard, cvc: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Cardholder name</Label>
                    <Input
                      placeholder="Full name on card"
                      value={dCard.holder}
                      onChange={(e) =>
                        setDCard({ ...dCard, holder: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <Label>Billing country</Label>
                      <Select
                        value={dCard.country}
                        onValueChange={(v) =>
                          setDCard({ ...dCard, country: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input
                        placeholder="Address (optional)"
                        value={dCard.address}
                        onChange={(e) =>
                          setDCard({ ...dCard, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* UPI option */}
            <div
              className={`rounded-lg border p-4 ${
                dMethod === "upi" ? "ring-2 ring-teal-600 bg-teal-50" : ""
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <RadioGroupItem value="upi" id="pay-upi" />
                <FiSmartphone className="text-teal-600" />
                <span className="font-medium">UPI</span>
              </label>

              {dMethod === "upi" && (
                <div className="mt-4 space-y-3">
                  <img
                    alt="UPI QR Code"
                    src="donation/upi-qr-code.jpg"
                    className="w-full h-auto rounded-lg border object-contain"
                  />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Scan with any UPI app to pay securely. After paying, click
                    “Complete donation” to record your contribution.
                  </p>
                </div>
              )}
            </div>
          </RadioGroup>

          {dMethod === "card" && (
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Checkbox id="save-info" />
                <label htmlFor="save-info" className="text-sm text-slate-700">
                  Save my information for faster checkout
                  <span className="block text-xs text-slate-500">
                    UI demo only. Your info is not persisted.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-4 pt-3 sticky bottom-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t flex items-center justify-end gap-3">
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-slate-700">
            Cancel
          </Button>
        </DialogTrigger>
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Complete donation
        </Button>
      </div>
    </form>
  );
}
