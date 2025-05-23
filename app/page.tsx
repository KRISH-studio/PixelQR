import { QRCodeGenerator } from "@/components/qr-code-generator"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-2xl font-bold">Pixel QR</h1>
          </div>
          <div className="flex items-center gap-4">

            <a
              href="https://www.instagram.com/krishh_zxzx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <InstagramIcon className="size-5" />
            </a>

            <a
              href="https://x.com/SinghalKri79456"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <TwitterIcon className="size-5" />
            </a>

              <a
              href="https://www.linkedin.com/in/krish-singhal-b67bb5313/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkedinIcon className="size-5" />
            </a>

            <a
              href="https://github.com/KRISH-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="size-5" />
            </a>

            <ModeToggle />
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <QRCodeGenerator />
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pixel QR. All rights reserved.</p>
        </footer>
      </div>
      
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5670862530868386"
           crossorigin="anonymous"></script>
      <!-- Ads -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-5670862530868386"
           data-ad-slot="8052834509"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
  
    </main>
  )
}
