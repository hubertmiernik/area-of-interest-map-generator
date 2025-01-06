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
  UseFormClearErrors,
  FieldError,
} from "react-hook-form";
import GeoJSON from "ol/format/GeoJSON";
import {
  CreateProjectFormFields,
  CreateProjectFormValues,
} from "@/hooks/forms/use-create-project-form";

type ExtendedFieldError = FieldError & {
  data?: FieldError;
  fileName?: FieldError;
};

type GeoJsonUploaderProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TFieldName> & {
  label?: string;
  className?: string;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<CreateProjectFormValues>;
};

const GeoJsonUploaderForm = <TFieldValues extends FieldValues>({
  name,
  control,
  className,
  label,
  setError,
  clearErrors,
}: GeoJsonUploaderProps<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control });
  const [isDragging, setIsDragging] = useState(false);

  const { error } = fieldState as { error: ExtendedFieldError | undefined };

  const validateGeoJSON = (text: string): boolean => {
    try {
      const format = new GeoJSON();
      const features = format?.readFeatures(text, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });
      return features.length > 0;
    } catch {
      return false;
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (validateGeoJSON(text)) {
        field.onChange({ data: text, fileName: file.name });
        clearErrors(CreateProjectFormFields.AREA_OF_INTEREST);
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

  const uploadedFileName = field.value?.fileName || null;

  return (
    <div>
      {label && (
        <Text type={"smallBody"}>
          <label className={`block ${error ? "text-red-400" : ""}`}>
            {label}
          </label>
        </Text>
      )}
      <div
        onClick={() => document.getElementById("geojson-upload")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          `w-full border border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
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
          <ImagePlus className={"text-tmp07 mb-2"} />
          <Text type={"smallBody"}>
            Drop your GeoJSON file here, or <b>browse</b>
          </Text>
          {uploadedFileName && (
            <Text type={"tip"} className="mt-2 font-medium">
              {uploadedFileName}
            </Text>
          )}
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1">
          {error?.data?.message || error?.message}
        </p>
      )}
    </div>
  );
};

export default GeoJsonUploaderForm;
