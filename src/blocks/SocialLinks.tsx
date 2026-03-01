import { LinkButton } from "@components/LinkButton"
import style from './SocialLinks.module.css'

import XIcon from "@icons/x.svg?react"
import DiscordIcon from "@icons/discord.svg?react"
import BlueskyIcon from "@icons/bluesky.svg?react"
import YoutubeIcon from "@icons/youtube.svg?react"
import TwitchIcon from "@icons/twitch.svg?react"
import InstagramIcon from "@icons/instagram.svg?react"
import FacebookIcon from "@icons/facebook.svg?react"

const SocialStyles = {
  x: { image: XIcon, backgroundColor: "black" },
  discord: { image: DiscordIcon, backgroundColor: "rgb(114, 137, 218)" },
  bluesky: { image: BlueskyIcon, backgroundColor: "rgb(15, 115, 255)" },
  youtube: { image: YoutubeIcon, backgroundColor: "rgb(154, 0, 31)" },
  twitch: { image: TwitchIcon, backgroundColor: "rgb(169, 112, 255)" },
  instagram: { image: InstagramIcon, backgroundColor: "rgb(199, 55, 170)" },
  facebook: { image: FacebookIcon, backgroundColor: "rgb(8, 102, 255)" },
} as const;

const SocialsConfig = [
  { style: SocialStyles.x,         href: "https://x.com/sotfest", text: "Follow us on X / Twitter", rotation: -3 },
  { style: SocialStyles.discord,   href: "https://discord.gg/tZAtDtJxDw", text: "Join our Discord Server", rotation: 2 },
  { style: SocialStyles.bluesky,   href: "https://bsky.app/profile/sotfest.uk", text: "Check us out on BlueSky", rotation: -5 },
  { style: SocialStyles.youtube,   href: "https://www.youtube.com/@sotfest", text: "Subscribe to us on YouTube", rotation: 2 },
  { style: SocialStyles.twitch,    href: "https://www.twitch.tv/sotfest", text: "Watch us Live on Twitch", rotation: -2 },
  { style: SocialStyles.instagram, href: "https://www.instagram.com/sotfest_community", text: "View our posts on Instagram", rotation: 3 },
  { style: SocialStyles.facebook,  href: "https://www.facebook.com/sotfestofficial", text: "Follow our Facebook Page", rotation: -1 },
  { style: SocialStyles.facebook,  href: "https://www.facebook.com/groups/sotfest", text: "Join the SoTFest Facebook Group", rotation: 2 },
] as const;

export const SocialLinks: React.FC = () => {
  return (
    <div className={style.container}>
      {SocialsConfig.map((social, index) => 
        <LinkButton 
          key={index}
          href={social.href}
          text={social.text}
          Icon={social.style.image}
          color="white"
          backgroundColor={social.style.backgroundColor}
          rotation={social.rotation}
        />
      )}
    </div>
  );
};