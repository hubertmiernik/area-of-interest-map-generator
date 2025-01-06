"use client";

import { ChangeEvent, useState } from "react";

import React from "react";
import Text from "@/components/ui/text";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormSetError,
} from "react-hook-form";
import GeoJSON from "ol/format/GeoJSON";

type GeoJsonUploaderProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TFieldName> & {
  label?: string;
  className?: string;
  setError: UseFormSetError<TFieldValues>; // Dodaj setError
};

const FileUploaderForm = <TFieldValues extends FieldValues>({
  name,
  control,
  className,
  label,
  setError,
}: GeoJsonUploaderProps<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { error } = fieldState;

  const validateGeoJSON = (text: string): boolean => {
    try {
      const format = new GeoJSON();
      const features = format.readFeatures(text, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      return features.length > 0;
    } catch (err) {
      return false;
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (validateGeoJSON(text)) {
        field.onChange(text);
        setError(name, { type: "manual", message: "" });
      } else {
        field.onChange(null);
        setError(name, { type: "manual", message: "Invalid GeoJSON format" });
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "application/geo+json") {
      handleFile(file);
    }
  };

  return (
    <div>
      {label && (
        <label
          className={`block text-sm font-medium mb-2 ${
            error ? "text-red-500" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => document.getElementById("geojson-upload")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          `w-fit border border-dashed rounded-sm p-4 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`,
          className,
        )}
      >
        <Input
          id="geojson-upload"
          type="file"
          accept="application/geo+json"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className={"flex flex-col items-center"}>
          <ImagePlus className={"text-gray-500 mb-2"} />
          <Text type={"smallBody"} className="text-gray-500">
            Drop your GeoJSON file here, or <b>browse</b>
          </Text>
          {fileName && (
            <Text type={"tip"} className="mt-2 font-medium text-gray-900">
              {fileName}
            </Text>
          )}
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error.message || "Invalid GeoJSON format"}
        </p>
      )}
    </div>
  );
};

export default FileUploaderForm;
