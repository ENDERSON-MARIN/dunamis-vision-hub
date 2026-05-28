import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, ChevronDown, User, Package, LogOut, Settings, MapPin } from "lucide-react";
import { Logo } from "@/_components/common/Logo";
import { useStore } from "@/_components/ecommerce/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/dunamis-data";

export function SiteHeader() {
  const { cartCount, favorites } = useStore();

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-border/60">
      <div className="container-1440">
        <div className="flex items-center gap-6 h-16">
          <Logo />

          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                placeholder="Busque por armações, marcas, óculos de sol…"
                className="pl-10 h-10 bg-secondary/60 border-transparent focus-visible:bg-card focus-visible:border-border"
                aria-label="Buscar produtos"
              />
            </div>
          </div>

          <nav className="flex items-center gap-1" aria-label="Ações da conta">
            <Link to="/favorites" className="relative h-10 w-10 grid place-items-center rounded-md hover:bg-secondary transition-colors" aria-label="Favoritos">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-foreground text-background text-[10px] font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative h-10 w-10 grid place-items-center rounded-md hover:bg-secondary transition-colors" aria-label={`Carrinho (${cartCount} itens)`}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 px-3 inline-flex items-center gap-1.5 rounded-md hover:bg-secondary transition-colors text-sm font-medium" aria-label="Minha Conta">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">Minha Conta</span>
                <ChevronDown className="w-4 h-4 opacity-60" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-display">Olá, bem-vindo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer"><User className="w-4 h-4" /> Entrar / Criar conta</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><Package className="w-4 h-4" /> Meus pedidos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><MapPin className="w-4 h-4" /> Endereços</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><Heart className="w-4 h-4" /> Favoritos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><Settings className="w-4 h-4" /> Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-muted-foreground"><LogOut className="w-4 h-4" /> Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>

      {/* Category ribbon */}
      <div className="border-t border-border/60 bg-card/40">
        <div className="container-1440">
          <ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide h-10">
            {categories.map(c => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="inline-flex items-center px-3 h-10 text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/80 transition-colors whitespace-nowrap relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:bg-primary after:transition-transform after:origin-left"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
