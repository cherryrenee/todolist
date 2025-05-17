import { useRef, useState } from "react";
import Image from "next/image";

export const FileUploader = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEnglishFileName = (name: string) => /^[a-zA-Z0-9_\-.]+$/.test(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if(!isEnglishFileName(file.name)){
      setError("파일 이름은 영어, 숫자, 밑줄, 하이픈으로만 이루어져있어야합니다.");
      setImageUrl(null);
      return;
    }
    setError(null);
    const reader=new FileReader();
    reader.onload=()=>{
      setImageUrl(reader.result as string)
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = ()=> {
    fileRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {error && <p style={{color:"red"}}>{error}</p>}
      {imageUrl===null ?( <div className="showImage"><Image src="/img.svg" alt="이미지파일" width={64} height={64} /><button onClick={openFileDialog} className="addImage"><Image src="/plusButton.svg" alt="빈 이미지 파일" width={24} height={24} /></button></div>): imageUrl && (
        <div className="noBorder">
          <img
           src={imageUrl}
           alt="미리보기"
           className="showImages"
           />
          <button onClick={openFileDialog} className="editImage"><Image src="/edit.svg" alt="수정하기" width={24} height={24} /></button> 
           </div>
      )}
      <div className="memo">
        <input type="text" className="memoText"/>
      </div>
    </div>
    
  );
};
