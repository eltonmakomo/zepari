import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/site/VideoPlayer";

afterEach(cleanup);

describe("On-site video playback", () => {
  it("starts the selected video only on opening and stops it on closing", async () => {
    const { baseElement } = render(
      <VideoPlayer title="Workshop" youtubeId="aqz-KE-bpKQ">
        <Button aria-label="Play video">Play</Button>
      </VideoPlayer>,
    );
    expect(baseElement.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Play video" }));
    await waitFor(() => expect(baseElement.querySelector("iframe")?.src).toBe(
      "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&playsinline=1&rel=0",
    ));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(baseElement.querySelector("iframe")).toBeNull());
  });
});