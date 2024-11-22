"use client";
import Image from "next/image";
import milestones from "./assets/milestones.png";
import { useCameraPosition } from "@/utils/context";

export default function Milestones() {
  const { setTargetPosition } = useCameraPosition();
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center absolute top-0 left-0 h-full pointer-events-none">
        <div className="absolute top-10  size-fit">
          <div className="relative">
            <Image src={milestones} alt="MILESTONES" className="w-[35rem]" />
            <button
              id="prehistoric"
              className="size-12 pointer-events-auto absolute top-0 left-0 rounded-full "
              onClick={() => setTargetPosition([0, 0, 0])}
            />
            <button
              id="egypt"
              className="size-12 pointer-events-auto absolute top-0 left-32 rounded-full "
              onClick={() => setTargetPosition([10, 0, 0])}
            />
            <button
              id="dynasty"
              className="size-12 pointer-events-auto absolute top-0 left-64 rounded-full "
              onClick={() => setTargetPosition([20, 0, 0])}
            />
            <button
              id="ww2"
              className="size-12 pointer-events-auto absolute top-0 right-32 rounded-full "
              onClick={() => setTargetPosition([30, 0, 0])}
            />
            <button
              id="nyc"
              className="size-12 pointer-events-auto absolute top-0 right-0 rounded-full "
              onClick={() => setTargetPosition([40, 0, 0])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
