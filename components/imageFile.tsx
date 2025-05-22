//component/imageFile.tsx
"use client";

import { useState, useRef } from "react";
import { useTodoStore } from "@/store/todoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const FileUploader = ({ todoId }: { todoId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { updateMemo, updateImage, removeTodo, todos } = useTodoStore();

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const isEnglish = /^[a-zA-Z0-9_\-.]+$/.test(file.name);
    if (!isEnglish) {
      alert("파일 이름은 영어로와 숫자와 하이픈으로만 이루어져야합니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      updateImage(todoId, base64String);
    };
    reader.readAsDataURL(file);
  };
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  const [edited, setEdited] = useState(false);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {todo.image ? (
        <div className="noBorder">
          <img src={todo.image} alt="미리보기" className="showImages" />
          <button type="button" onClick={openFileDialog} className="editImage">
            <Image src="/edit.svg" alt="수정하기" width={24} height={24} />
          </button>
        </div>
      ) : (
        <div className="showImage">
          <Image src="/img.svg" alt="이미지파일" width={64} height={64} />
          <button type="button" onClick={openFileDialog} className="addImage">
            <Image
              src="/plusButton.svg"
              alt="빈 이미지 파일"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
      <div className="memo">
        <input
          type="text"
          className="memoText"
          value={todo.memo || ""}
          onChange={(e) => updateMemo(todoId, e.target.value)}
        />
      </div>

      <div className="editBtns">
        <button
          className={!edited ? "gonnaEdit" : "completeEdit"}
          onClick={() => setEdited(!edited)}
        >
          <Image src="/check.svg" alt="수정하기" width={16} height={16} />
          수정 완료
        </button>
        <button
          className="gonnaDelete"
          onClick={() => {
            removeTodo(todoId);
            router.push("/");
          }}
        >
          <Image src="/X.svg" alt="삭제하기" width={16} height={16} />
          삭제하기
        </button>
      </div>
    </div>
  );
};
