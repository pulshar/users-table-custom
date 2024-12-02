import { useState } from "react";
import { capitalize } from "../helpers";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";

export default function UserDetails({ data, toggleModal }) {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const objProperties = Object.keys(data);
  return (
    <>
      <div className="relative mt-3 flex items-center justify-center">
        {!imgIsLoaded && (
          <LoaderCircleIcon
            size={24}
            className="absolute animate-spin text-primary"
          />
        )}
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 bg-foreground/10">
          <motion.img
            initial={{ opacity: 0 }}
            animate={imgIsLoaded && { opacity: 1 }}
            className="w-full"
            src="https://i.pravatar.cc/300"
            alt="Rounded avatar"
            onLoad={() => {
              setImgIsLoaded(true);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y">
        {objProperties.map((prop) => {
          if (prop !== "id" && prop !== "username") {
            return (
              <div key={prop} className="p-3 text-sm">
                <label className="font-semibold">{capitalize(prop)}</label>
                <p className="text-foreground/60">
                  {" "}
                  {data[prop] || "Not provided"}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="muted" onClick={toggleModal}>
          Close
        </Button>
      </div>
    </>
  );
}
