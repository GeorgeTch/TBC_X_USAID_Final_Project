"use client";

import { Toggle } from "@/components/ui/toggle";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrderedIcon,
  Strikethrough,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const Tiptap = ({ textValue }: { textValue: string }) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Add a longer description to your product",
        emptyNodeClass:
          "first:before:text-gray-600 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),

      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },

    content: textValue,

    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  //for the description autofill on edit mode
  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(textValue);
  }, [textValue]);

  return (
    <div className="flex flex-col gap-2">
      {editor && (
        <div className="border border-input rounded-md">
          <Toggle
            size={"sm"}
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().toggleBold().focus().run()}
          >
            <Bold className="w-4 h-4" />
          </Toggle>

          <Toggle
            size={"sm"}
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().toggleItalic().focus().run()}
          >
            <Italic className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
          >
            <Strikethrough className="w-4 h-4" />
          </Toggle>

          <Toggle
            size={"sm"}
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().toggleOrderedList().focus().run()
            }
          >
            <ListOrderedIcon className="w-4 h-4" />
          </Toggle>

          <Toggle
            size={"sm"}
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().toggleBulletList().focus().run()
            }
          >
            <List className="w-4 h-4" />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
