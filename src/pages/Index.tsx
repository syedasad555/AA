import { useState, useCallback } from "react";
import HeartIntro from "@/components/HeartIntro";
import StageTransition from "@/components/StageTransition";
import MemoryBoxes from "@/components/MemoryBoxes";
import CircularDomeGallery from "@/components/CircularDomeGallery";
import ValentineQuestion from "@/components/ValentineQuestion";
import FinalScreen from "@/components/FinalScreen";

type Page = "intro" | "stage1" | "memories" | "stage2" | "dome" | "stage3" | "valentine" | "final";

const Index = () => {
  const [page, setPage] = useState<Page>("intro");

  const goToStage1 = useCallback(() => setPage("stage1"), []);
  const goToMemories = useCallback(() => setPage("memories"), []);
  const goToStage2 = useCallback(() => setPage("stage2"), []);
  const goToDome = useCallback(() => setPage("dome"), []);
  const goToStage3 = useCallback(() => setPage("stage3"), []);
  const goToValentine = useCallback(() => setPage("valentine"), []);
  const goToFinal = useCallback(() => setPage("final"), []);
  const goBackToMemories = useCallback(() => setPage("memories"), []);
  const goBackToDome = useCallback(() => setPage("dome"), []);
  const goBackToValentine = useCallback(() => setPage("valentine"), []);

  return (
    <>
      {page === "intro" && <HeartIntro onComplete={goToStage1} />}
      {page === "stage1" && <StageTransition text="Stage 1: The Memories" onComplete={goToMemories} />}
      {page === "memories" && <MemoryBoxes onNext={goToStage2} />}
      {page === "stage2" && <StageTransition text="Stage 2: The Moments" onComplete={goToDome} />}
      {page === "dome" && <CircularDomeGallery onNext={goToStage3} onBack={goBackToMemories} />}
      {page === "stage3" && <StageTransition text="Stage 3: The Question...With known answer!😉" onComplete={goToValentine} />}
      {page === "valentine" && <ValentineQuestion onYes={goToFinal} onBack={goBackToDome} />}
      {page === "final" && <FinalScreen onBack={goBackToValentine} />}
    </>
  );
};

export default Index;
