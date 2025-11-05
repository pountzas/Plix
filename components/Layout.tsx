"use client";

import Header from "./Header";
import Menu from "./Menu";
import MediaModal from "./MediaModal";
import { useVisualStore } from "../stores/visualStore";
import Image from "next/image";
import { Activity } from "react";

interface LayoutProps {
  children: React.ReactNode;
  showMenu?: boolean;
  showBackground?: boolean;
}

export default function Layout({
  children,
  showMenu = true,
  showBackground = true,
}: LayoutProps) {
  const backgroundImageUrl = useVisualStore(
    (state) => state.backgroundImageUrl
  );
  const imageVisible = useVisualStore((state) => state.imageVisible);

  return (
    <div className="h-screen bg-gray-900 text-white">
      {/* Header with high z-index to appear above backgrounds */}
      <div className="relative z-30">
        <Header />
      </div>

      {showMenu ? (
        <div className="flex flex-row w-full">
          {/* Menu with high z-index to appear above backgrounds */}
          <div className="relative z-20">
            <Menu />
          </div>
          {/* Content */}
          <div className="relative z-10">{children}</div>
        </div>
      ) : (
        /* Content without menu/sidebar */
        <div className="relative z-10">{children}</div>
      )}

      {/* Background Image */}
      <Activity
        mode={
          showBackground && imageVisible && backgroundImageUrl
            ? "visible"
            : "hidden"
        }
      >
        <div className="fixed inset-0 z-0">
          <Image
            className="min-w-full min-h-screen"
            src={`https://www.themoviedb.org/t/p/original${backgroundImageUrl}`}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </Activity>

      <MediaModal />
    </div>
  );
}
