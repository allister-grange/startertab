import { TileId } from "@/types";
import { Box, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownFileTileProps {
  tileId: TileId;
}

export const MarkdownFileTile: React.FC<MarkdownFileTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;

  // on load, if no markdown file, open it
  const fileInputRef = useRef(null);
  const [markdown, setMarkdown] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);
    const markdownText = await fileObj.text();

    console.log("markdownText", markdownText);
    setMarkdown(markdownText);
  };

  return (
    <Box p="6">
      <Input ref={fileInputRef} type="file" onChange={handleFileChange} />

      <div className="markdown-body" style={{ color }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </Box>
  );
};
