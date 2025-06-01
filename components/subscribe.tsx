import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function SubscribeButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          S&lsquo;abonner
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Options d&lsquo;abonnement</AlertDialogTitle>
          <AlertDialogDescription>
            Choisissez la formule qui vous convient
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Choix de période */}
          <div className="grid grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="period"
                value="monthly"
                defaultChecked
                className="peer hidden"
              />
              <div className="border rounded-md p-4 peer-checked:border-chart-4 border-2 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <span className="font-medium">Mensuel</span>
                  <span className="text-sm text-muted-foreground">9.99€/mois</span>
                </div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="period"
                value="annual"
                className="peer hidden"
              />
              <div className="border rounded-md p-4 peer-checked:border-chart-4 border-2 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <span className="font-medium">Annuel</span>
                  <span className="text-sm text-muted-foreground">99€/an (2 mois offerts)</span>
                </div>
              </div>
            </label>
          </div>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou suivez-nous sur
              </span>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex justify-center space-x-4">
            <AlertDialogAction asChild>
              <Link
                href="https://twitter.com/votrepage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-center"
              >
                <Twitter className="h-6 w-6" />
                <span className="text-xs">Twitter</span>
              </Link>
            </AlertDialogAction>

            <AlertDialogAction asChild>
              <Link
                href="https://facebook.com/votrepage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-center"
              >
                <Facebook className="h-6 w-6" />
                <span className="text-xs">Facebook</span>
              </Link>
            </AlertDialogAction>

            <AlertDialogAction asChild>
              <Link
                href="https://instagram.com/votrepage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-center"
              >
                <Instagram className="h-6 w-6" />
                <span className="text-xs">Instagram</span>
              </Link>
            </AlertDialogAction>
          </div>
        </div>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction className="bg-primary hover:bg-primary/90">
            Acheter maintenant
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
