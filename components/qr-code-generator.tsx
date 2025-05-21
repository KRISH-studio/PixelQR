"use client"

import { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  LinkIcon,
  MessageSquareText,
  Wifi,
  Mail,
  Phone,
  Share2,
  Copy,
  Check,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

type QRCodeType = "url" | "text" | "wifi" | "email" | "phone"

interface QRCodeData {
  url: string
  text: string
  wifi: {
    ssid: string
    password: string
    encryption: string
  }
  email: string
  phone: string
}

export function QRCodeGenerator() {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState<QRCodeType>("url")
  const [qrData, setQrData] = useState<QRCodeData>({
    url: "https://example.com",
    text: "Hello World",
    wifi: {
      ssid: "MyWiFi",
      password: "password123",
      encryption: "WPA",
    },
    email: "example@example.com",
    phone: "+1234567890",
  })
  const [qrValue, setQrValue] = useState("")
  const [qrColor, setQrColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Generate QR code value based on active tab and data
  useEffect(() => {
    let value = ""
    switch (activeTab) {
      case "url":
        value = qrData.url
        break
      case "text":
        value = qrData.text
        break
      case "wifi":
        value = `WIFI:S:${qrData.wifi.ssid};T:${qrData.wifi.encryption};P:${qrData.wifi.password};;`
        break
      case "email":
        value = `mailto:${qrData.email}`
        break
      case "phone":
        value = `tel:${qrData.phone}`
        break
    }

    // Simulate loading for better UX
    setIsGenerating(true)
    const timer = setTimeout(() => {
      setQrValue(value)
      setIsGenerating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [activeTab, qrData])

  const handleInputChange = (type: QRCodeType, value: string, subField?: keyof typeof qrData.wifi) => {
    if (type === "wifi" && subField) {
      setQrData({
        ...qrData,
        wifi: {
          ...qrData.wifi,
          [subField]: value,
        },
      })
    } else {
      setQrData({
        ...qrData,
        [type]: value,
      })
    }
  }

  const downloadQRCode = (format: "png" | "svg") => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (!canvas) return

    if (format === "png") {
      const link = document.createElement("a")
      link.download = `qrcode-${activeTab}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } else {
      // For SVG, we need to create an SVG from the canvas
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
          <rect width="100%" height="100%" fill="${bgColor}"/>
          <image href="${canvas.toDataURL("image/png")}" x="0" y="0" width="${canvas.width}" height="${canvas.height}"/>
        </svg>
      `
      const link = document.createElement("a")
      link.download = `qrcode-${activeTab}.svg`
      link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`
      link.click()
    }
  }

  const copyQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard
          .write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ])
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
      }
    })
  }

  const shareQRCode = async () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (!canvas || !navigator.share) return

    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const file = new File([blob], `qrcode-${activeTab}.png`, { type: "image/png" })
          await navigator.share({
            title: "QR Code",
            text: "Check out this QR code I generated!",
            files: [file],
          })
        } catch (error) {
          console.error("Error sharing:", error)
        }
      }
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const qrCodeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <motion.div variants={itemVariants}>
        <Card className="backdrop-blur-sm bg-background/80 border-muted shadow-lg">
          <CardHeader>
            <CardTitle>Create Your QR Code</CardTitle>
            <CardDescription>Select a type and enter your information to generate a QR code.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="url" value={activeTab} onValueChange={(value) => setActiveTab(value as QRCodeType)}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>URL</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Text</span>
                </TabsTrigger>
                <TabsTrigger value="wifi" className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>WiFi</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={qrData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text Content</Label>
                  <Input
                    id="text"
                    placeholder="Enter your text here"
                    value={qrData.text}
                    onChange={(e) => handleInputChange("text", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="wifi" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ssid">Network Name (SSID)</Label>
                  <Input
                    id="ssid"
                    placeholder="Your WiFi name"
                    value={qrData.wifi.ssid}
                    onChange={(e) => handleInputChange("wifi", e.target.value, "ssid")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="WiFi password"
                      value={qrData.wifi.password}
                      onChange={(e) => handleInputChange("wifi", e.target.value, "password")}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption Type</Label>
                  <Select
                    value={qrData.wifi.encryption}
                    onValueChange={(value) => handleInputChange("wifi", value, "encryption")}
                  >
                    <SelectTrigger id="encryption">
                      <SelectValue placeholder="Select encryption type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WPA">WPA/WPA2</SelectItem>
                      <SelectItem value="WEP">WEP</SelectItem>
                      <SelectItem value="nopass">No Password</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    value={qrData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1234567890"
                    value={qrData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="qr-color"
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input type="text" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="backdrop-blur-sm bg-background/80 border-muted shadow-lg">
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
            <CardDescription>Scan with a QR code reader or download to use elsewhere.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <motion.div
              key={qrValue + qrColor + bgColor}
              initial="hidden"
              animate="visible"
              variants={qrCodeVariants}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-md"
              style={{ backgroundColor: bgColor }}
            >
              {isGenerating ? (
                <div className="w-64 h-64 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : (
                <QRCodeCanvas
                  id="qr-code"
                  value={qrValue}
                  size={256}
                  bgColor={bgColor}
                  fgColor={qrColor}
                  level="H"
                  includeMargin={true}
                />
              )}
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => downloadQRCode("png")}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              PNG
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadQRCode("svg")}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              SVG
            </Button>
            <Button
              variant="outline"
              onClick={copyQRCode}
              disabled={isGenerating || copied}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            {navigator.share && (
              <Button
                variant="outline"
                onClick={shareQRCode}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
