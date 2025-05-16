"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FileUploader } from "@/components/imageFile";

type PageProps = {
  params: {
    id: string;
  };
};

const metadata = {
  title: "do it;",
  description: "Making a to do list",
  icons: { icon: "/favicon.svg" },
};

export default function DetailPage({ params }: PageProps) {
  const searchParams = useSearchParams();

  const text = searchParams.get("text");
  const checked = searchParams.get("checked") === "true";

  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <>
      <header>
        <a href="/">
          <Image
            id="logo"
            alt="logo"
            src="/Size=Small.png"
            width={71}
            height={40}
          />
        </a>
      </header>
      <main>
        <div className="todoDiv">
          <div className={`todoList ${isChecked ? "checked" : ""}`}>
            <input
              className="checkbox"
              type="checkbox"
              id={params.id}
              checked={isChecked}
              onChange={handleToggle}
              onClick={handleToggle}
            />
            <span className="checkmark" />
            <div className="todoBar">{text}</div>
          </div>
        </div>
        <FileUploader />
      </main>
    </>
  );
}
