//component/imageFile.tsx
"use client";

import { useState, useRef } from "react";
import { useTodoStore } from "@/store/todoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

// FileUploader 컴포넌트
// 할일의 메모와 이미지를 업로드하는 컴포넌트
export const FileUploader = ({ todoId }: { todoId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // zustand 스토어에서 todos, updateMemo, updateImage, removeTodo 가져오기
  const { updateMemo, updateImage, removeTodo, todos } = useTodoStore();

  // todoId에 해당하는 todo를 찾기
  const todo = todos.find((t) => t.id === todoId);
  if (!todo) return null;

  // 파일 선택 시 호출되는 함수
  // 파일을 base64로 변환하여 todo에 저장
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
      {/* 이미지 업로드 버튼 */
      /* 파일 선택 input은 숨김 처리 */}
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
      {/* 메모 입력란 */}
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
