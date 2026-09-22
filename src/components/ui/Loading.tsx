import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SyncLoader color="#3254FF" />
    </div>
  )
}