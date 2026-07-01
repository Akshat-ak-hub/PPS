import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X, FileImage } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage: { file: File; preview: string } | null;
  disabled?: boolean;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ImageUploader = ({ onImageSelect, onImageRemove, selectedImage, disabled }: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) { alert("Image must be under 5MB"); return; }
    if (!file.type.startsWith("image/")) { alert("Only image files are allowed"); return; }
    onImageSelect(file);
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    maxFiles: 1,
    disabled,
    noClick: !!selectedImage,
    noKeyboard: !!selectedImage,
  });

  if (selectedImage) {
    return (
      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg border border-border">
        <img src={selectedImage.preview} alt="Selected" className="w-10 h-10 object-cover rounded border border-border shrink-0" />
        <span className="text-xs text-muted-foreground flex-1 truncate">{selectedImage.file.name}</span>
        <button
          type="button"
          onClick={onImageRemove}
          className="p-1 hover:bg-background rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      {...getRootProps()}
      disabled={disabled}
      className="p-2.5 bg-card hover:bg-muted disabled:opacity-50 text-foreground border border-border rounded-xl flex items-center justify-center transition-all cursor-pointer relative"
      aria-label="Attach image"
    >
      <input {...getInputProps()} />
      {isDragActive ? <FileImage className="w-4 h-4 text-primary" /> : <ImagePlus className="w-4 h-4" />}
    </button>
  );
};

export default ImageUploader;