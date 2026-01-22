"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/commonUtils";

export interface Network {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface NetworkSwitcherProps {
  networks?: Network[];
  selectedNetwork?: Network;
  onNetworkChange?: (network: Network) => void;
  className?: string;
  variant?: "dashboard" | "landing";
}

const defaultNetworks: Network[] = [
  { id: "eth", name: "ETH" },
  { id: "polygon", name: "Polygon" },
  { id: "bsc", name: "BSC" },
  { id: "arbitrum", name: "Arbitrum" },
];

export default function NetworkSwitcher({
  networks = defaultNetworks,
  selectedNetwork = defaultNetworks[0],
  onNetworkChange,
  className,
  variant = "dashboard",
}: NetworkSwitcherProps) {
  const [currentNetwork, setCurrentNetwork] = useState<Network>(selectedNetwork);

  const handleNetworkSelect = (network: Network) => {
    setCurrentNetwork(network);
    onNetworkChange?.(network);
  };

  // Ethereum icon SVG (diamond shape)
  const EthereumIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L5.5 12.5L12 16L18.5 12.5L12 0Z"
        fill="currentColor"
      />
      <path
        d="M12 17.5L5.5 13.5L12 24L18.5 13.5L12 17.5Z"
        fill="currentColor"
      />
    </svg>
  );

  const isDashboard = variant === "dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border transition-colors outline-none focus:ring-1 focus:ring-offset-1",
          isDashboard
            ? "bg-transparent border-[#242428] text-white hover:bg-[#1A1A1A] focus:ring-[#598EFF]"
            : "bg-transparent border-[#598EFF]/30 text-white hover:bg-[#598EFF]/10 focus:ring-[#598EFF]",
          className
        )}
      >
        <EthereumIcon />
        <span
          className="text-sm font-medium"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          {currentNetwork.name}
        </span>
        <ChevronDown className="w-4 h-4 text-[#6e6d6e]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "min-w-[140px] border-[#242428] text-white",
          isDashboard ? "bg-[#1A1A1A]" : "bg-[#0a0a0a]"
        )}
        align="end"
        sideOffset={8}
      >
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => handleNetworkSelect(network)}
            className={cn(
              "cursor-pointer text-white",
              isDashboard
                ? "focus:bg-[#242428] focus:text-white"
                : "focus:bg-[#1A1A1A] focus:text-white",
              currentNetwork.id === network.id && (isDashboard ? "bg-[#242428]" : "bg-[#1A1A1A]")
            )}
          >
            <div className="flex items-center gap-2 w-full">
              {network.icon || <EthereumIcon />}
              <span
                className="text-sm"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                {network.name}
              </span>
              {currentNetwork.id === network.id && (
                <span className="ml-auto text-[#598EFF]">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

