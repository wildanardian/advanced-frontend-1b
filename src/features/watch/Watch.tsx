import { Button } from "@/components/ui/Button";

import watchBackground from "@/assets/images/background/watch-background.png";
import watchFilmBackground from "@/assets/images/background/watch-film-background.png";

import playIcon from "@/assets/icons/play.svg";
import rewindIcon from "@/assets/icons/rewind-10.svg";
import forwardIcon from "@/assets/icons/fast-forward-10.svg";
import soundIcon from "@/assets/icons/volume-high.svg";
import skipIcon from "@/assets/icons/skip-next-outline.svg";
import listIcon from "@/assets/icons/format-list-bulleted.svg";
import subtitleIcon from "@/assets/icons/message-text-outline.svg";
import speedIcon from "@/assets/icons/speedometer.svg";
import fullscreenIcon from "@/assets/icons/fullscreen.svg";

import SubtitleModal from "./components/SubtitleModal";
import { useRef, useState } from "react";
import SpeedModal from "./components/SpeedModal";
import { EpisodeModal } from "./components/EpisodeModal";
import useClickOutside from "@/hooks/use-click-outside";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dummyContentDetails } from "@/data/dummyContentDetail";

type ActiveModal = "subtitle" | "speed" | "episode" | null;
type WatchLocationState = { title?: string };

export default function Watch({ type }: { type: "film" | "series" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const selectedContent = dummyContentDetails.find(
    (content) => content.id === id && content.type === type,
  );
  const firstEpisode = selectedContent?.type === "series"
    ? selectedContent.episodes[0]
    : undefined;
  const passedTitle = (location.state as WatchLocationState | null)?.title;
  const contentTitle = passedTitle ?? selectedContent?.title;
  const contentLabel = selectedContent?.type === "series" && firstEpisode
    ? `${contentTitle} - ${firstEpisode.title}`
    : contentTitle ?? "Konten tidak ditemukan";

  useClickOutside(modalRef, () => setActiveModal(null));

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-10 left-10 z-100">
        <Button variant="watch" size="watch" icon={<ArrowLeft className="h-8 w-8" />} iconPosition="left"
          onClick={() => {
            navigate('/');
          }} />
      </div>
      {type === 'series' ? (
        <img src={watchBackground} alt="Watch Background" className="w-full h-full object-cover min-h-screen" />
      ) :
        <img src={watchFilmBackground} alt="Watch Background" className="w-full h-full object-cover min-h-screen" />
      }

      {/* Kalau di hover akan muncul background ini */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 flex items-center justify-center"></div>

      <div className="fixed bottom-0 bg-background-page-header opacity-60 h-[96px] py-7 px-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="watch" size="watch" icon={<img src={playIcon} alt="Play Icon" />} iconPosition="left" onClick={() => { }} />
          <Button variant="watch" size="watch" icon={<img src={rewindIcon} alt="Rewind Icon" />} iconPosition="left" onClick={() => { }} />
          <Button variant="watch" size="watch" icon={<img src={forwardIcon} alt="Forward Icon" />} iconPosition="left" onClick={() => { }} />
          <Button variant="watch" size="watch" icon={<img src={soundIcon} alt="Sound Icon" />} iconPosition="left" onClick={() => { }} />
        </div>
        <p className="text-white text-sm md:text-lg">{contentLabel}</p>
        <div className="flex items-center gap-12">
          {type === "series" && (
            <div className="flex items-center gap-6">
              <Button variant="watch" size="watch" icon={<img src={skipIcon} alt="Skip Icon" />} iconPosition="left" onClick={() => { }} />
              <Button variant="watch" size="watch" icon={<img src={listIcon} alt="List Icon" />} iconPosition="left" onClick={() => setActiveModal(prev => prev === 'episode' ? null : 'episode')} />
            </div>
          )}
          <div className="flex items-center gap-6">
            <Button variant="watch" size="watch" icon={<img src={subtitleIcon} alt="Subtitle Icon" />} iconPosition="left" onClick={() => setActiveModal(prev => prev === 'subtitle' ? null : 'subtitle')} />
            <Button variant="watch" size="watch" icon={<img src={speedIcon} alt="Speed Icon" />} iconPosition="left" onClick={() => setActiveModal(prev => prev === 'speed' ? null : 'speed')} />
            <Button variant="watch" size="watch" icon={<img src={fullscreenIcon} alt="Fullscreen Icon" />} iconPosition="left" onClick={() => { }} />
          </div>
        </div>
      </div>

      <div ref={modalRef}>
        {activeModal === 'subtitle' && <SubtitleModal show={true} />}
        {activeModal === 'speed' && <SpeedModal show={true} />}

        {activeModal === 'episode' && (
          <EpisodeModal show={true} defaultActiveId="1">
            <EpisodeModal.Item
              id="1"
              title="Episode 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <EpisodeModal.Item
              id="2"
              title="Episode 2"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </EpisodeModal>
        )}
      </div>

    </div>
  )
}
