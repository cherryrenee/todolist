"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {useTodoStore} from "@/store/todoStore";
import {useRouter} from "next/navigation";

interface FileUploaderProps {
  todoId: string;
}


export const FileUploader = ({todoId}:FileUploaderProps)=>{
 const fileRef = useRef<HTMLInputElement>(null);
   const router = useRouter();
 const {
  todos,
  updateImage,
  updateMemo,
  removeTodo,
}=useTodoStore();
const todo = todos.find((t) => t.id === todoId);
  if (!todo) return null;
   const isEnglishFileName = (name: string) => /^[a-zA-Z0-9_\-.]+$/.test(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if(!isEnglishFileName(file.name)){
      alert("파일 이름은 영어, 숫자, 밑줄, 하이픈으로만 이루어져야 합니다.")
      return;
    }
    const reader=new FileReader();
    reader.onload=()=>{
      const base64=reader.result as string;
       updateImage(todoId, base64);
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = ()=> {
    fileRef.current?.click();
  };

  const [isEdited, setIsEdited] = useState(false);
   

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
       {todo.image? (
        <div className="noBorder">
          <img
           src={todo.image}
           alt="미리보기"
           className="showImages"
           />
          <button onClick={openFileDialog} className="editImage"><Image src="/edit.svg" alt="수정하기" width={24} height={24} /></button> 
           </div>
      ): (
        <div className="showImage">
          <Image src="/img.svg" alt="이미지파일" width={64} height={64} />
          <button onClick={openFileDialog} className="addImage">
            <Image src="/plusButton.svg" alt="빈 이미지 파일" width={24} height={24} />
          </button>
        </div>
      )}
      <div className="memo">
        <input type="text" className="memoText" value={todo.memo || ""} onChange={(e)=> updateMemo(todoId, e.target.value)} />
      </div>
      <div className="editBtns">
        <button className={isEdited? "completeEdit":"gonnaEdit"} onClick={()=>setIsEdited(true)}><Image src="/check.svg" alt="수정하기" width={16} height={16} />수정 완료 </button>
        <button className="gonnaDelete" onClick={()=>{removeTodo(todoId); router.push("/");}}><Image src="/X.svg" alt="삭제하기" width={16} height={16} />삭제하기</button>
      </div>
    </div>
     
  );
};
