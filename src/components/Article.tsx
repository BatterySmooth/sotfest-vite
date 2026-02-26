import type { ReactNode } from "react";
import ticketImg from "@/assets/ticket.svg"
import websiteImg from "@/assets/website.svg"
import xImg from "@/assets/x.svg"
import discordImg from "@/assets/discord.svg"
import blueskyImg from "@/assets/bluesky.svg"
import youtubeImg from "@/assets/youtube.svg"
import twitchImg from "@/assets/twitch.svg"
import instagramImg from "@/assets/instagram.svg"
import facebookImg from "@/assets/facebook.svg"

interface ArticleProps {
  children: ReactNode;
}

export default function ParallaxHeader({ children }: ArticleProps) {
  return (
    <main>
      <div className="section tickets">
        <div className="header">
          <h1>10th & 11th July 2026 - Bescot Stadium</h1>
          <div className="separator"></div>
          <p>An event by the community, for the community!</p>
        </div>

        <a target="blank" href="https://sotfest.uk/tickets" className="tickets-link weathered-mask">
          <img width="64" height="64" src={ticketImg} alt="Buy tickets link icon"/>
            <h1>Tickets</h1>
        </a>
      </div>

      <div className="section socials">
        <h1 className="header">Socials</h1>
        <div className="separator"></div>
        <div className="socials-links">
          <a target="blank" href="https://www.sotfest.uk/" className="website weathered-mask">
            <img width="64" height="64" src={websiteImg} alt="Website link icon" />
            Our website
          </a>
          <a target="blank" href="https://x.com/sotfest" className="twitter weathered-mask">
            <img width="64" height="64" src={xImg} alt="X / Twitter link icon" />
            Follow us on X / Twitter
          </a>
          <a target="blank" href="https://discord.gg/tZAtDtJxDw" className="discord weathered-mask">
            <img width="64" height="64" src={discordImg} alt="Discord link icon" />
            Join our Discord Server
          </a>
          <a target="blank" href="https://bsky.app/profile/sotfest.uk" className="bluesky weathered-mask">
            <img width="64" height="64" src={blueskyImg} alt="BlueSky link icon" />
            Check us out on BlueSky
          </a>
          <a target="blank" href="https://www.youtube.com/@sotfest" className="youtube weathered-mask">
            <img width="64" height="64" src={youtubeImg} alt="YouTube link icon" />
            Subscribe to us on YouTube
          </a>
          <a target="blank" href="https://www.twitch.tv/sotfest" className="twitch weathered-mask">
            <img width="64" height="64" src={twitchImg} alt="Twitch link icon" />
            Watch us Live on Twitch
          </a>
          <a target="blank" href="https://www.instagram.com/sotfest_community" className="instagram weathered-mask">
            <img width="64" height="64" src={instagramImg} alt="Instagram link icon" />
            View our posts on Instagram
          </a>
          <a target="blank" href="https://www.facebook.com/sotfestofficial" className="facebook weathered-mask">
            <img width="64" height="64" src={facebookImg} alt="Facebook link icon" />
            Follow our Facebook Page
          </a>
          <a target="blank" href="https://www.facebook.com/groups/sotfest" className="facebook-group weathered-mask">
            <img width="64" height="64" src={facebookImg} alt="Facebook group link icon" />
            Join the SoTFest Facebook Group
          </a>
        </div>
      </div>

      <div className="section credits">
        <h1 className="header">Credits</h1>
        <div className="separator"></div>
        <div className="credits-container">
          <p>Artwork:</p>
          <a href="https://www.instagram.com/zaque_art/" target="blank">@zaque_art</a>
        </div>
      </div>

      <div className="spacer"></div>

      {children}

    </main>
  );
};