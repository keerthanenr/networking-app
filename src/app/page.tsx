"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Linkedin,
  PhoneIcon as WhatsApp,
  Share2,
  DiscIcon as DiscordIcon,
  X,
} from "lucide-react";
import { signUp } from "@/app/actions";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signUp(name, email);
    setMessage(result.message);
    if (result.success) {
      setName("");
      setEmail("");
    }
  };

  const generateQRCode = useCallback(async () => {
    try {
      const url = window.location.href;
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCode(qrCodeDataUrl);
      setShowQRCode(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowQRCode(false);
      }
    };

    if (showQRCode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQRCode]);

  return (
    <div className="min-h-screen bg-[#3498db] p-6">
      <div className="container mx-auto max-w-md">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full bg-white shadow-lg flex items-center justify-center">
            <Image
              src="/profilepic.jpeg" // Replace with your image path
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-white">@keerthanenr</h1>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-center">
                Sign up to my new app
              </CardTitle>
              <CardDescription className="text-center">
                Connect with me and sign up to a new way of networking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#3498db] hover:bg-[#2980b9]"
                >
                  Sign Up
                </Button>
              </form>
              {message && <p className="text-center text-sm">{message}</p>}
            </CardContent>
          </Card>

          <div className="w-full h-px bg-white/20 my-6" />

          <div className="space-y-5">
            <Link
              href="https://www.linkedin.com/in/keerthanen-ravichandran/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full h-14 justify-start bg-white hover:bg-gray-50 shadow-lg mb-3"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
            </Link>

            <Link
              href="https://discord.gg/your-discord-invite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full h-14 justify-start bg-white hover:bg-gray-50 shadow-lg mb-3"
              >
                <DiscordIcon className="mr-2 h-5 w-5" />
                Join our Discord
              </Button>
            </Link>

            <Link
              href="https://wa.me/447443925116"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full h-14 justify-start bg-white hover:bg-gray-50 shadow-lg mb-3"
              >
                <WhatsApp className="mr-2 h-5 w-5" />
                Message on WhatsApp
              </Button>
            </Link>
          </div>

          <div className="w-full h-px bg-white/20 my-6" />

          <Button
            onClick={generateQRCode}
            className="w-full h-14 justify-start bg-white text-black hover:bg-gray-50 shadow-lg"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share this page
          </Button>
        </div>
      </div>

      {showQRCode && qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-sm w-full relative"
          >
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Scan QR Code</h2>
            <Image
              src={qrCode}
              alt="QR Code"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
