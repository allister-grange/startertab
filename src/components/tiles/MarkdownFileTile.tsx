import { TileId } from "@/types";
import { Box } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownFileTileProps {
  tileId: TileId;
}

export const MarkdownFileTile: React.FC<MarkdownFileTileProps> = ({}) => {
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
    // 👇️ reset file input
    // event.target.value = null;

    // // 👇️ is now empty
    // console.log(event.target.files);

    // // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };

  return (
    <Box p="6">
      <input
        // style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />

      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  );
};
