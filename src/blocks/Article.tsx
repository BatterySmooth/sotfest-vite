import style from './Article.module.css'

import ticketImg from "@/assets/ticket.svg"
import tshirtImg from "@/assets/tshirt.svg"
import { LinkButton } from "../components/LinkButton";
import { SocialLinks } from "./SocialLinks";
import { SectionHeader } from "../components/SectionHeader";
import { ColumnLayout } from "../components/ColumnLayout";
import { Section } from "../components/Section";

export const Article: React.FC = () => {
  return (
    <ColumnLayout>
      <Section>
        <SectionHeader text="10th & 11th July 2026 - Bescot Stadium"/>
        <p>An event by the community, for the community!</p>
        <div className={style.ticketSection}>
          <LinkButton
            className={style.ticketButton}
            href="https://sotfest.uk/tickets"
            text="Tickets"
            image={ticketImg}
            color="rgb(82, 53, 0)"
            backgroundColor="rgb(238, 170, 45)"
            rotation={5}
          />
          <LinkButton
            className={style.ticketButton}
            href="https://sotfest.myspreadshop.co.uk/"
            text="Merch"
            image={tshirtImg}
            color="rgb(82, 53, 0)"
            backgroundColor="rgb(238, 170, 45)"
            rotation={-3}
          />
        </div>
      </Section>

      <Section>
        <SectionHeader text="Socials"/>
        <SocialLinks />
      </Section>

      <Section>
        <SectionHeader text="Credits"/>
        <div className="credits-container">
          <p>Artwork:</p>
          <a href="https://www.instagram.com/zaque_art/" target="blank">@zaque_art</a>
        </div>
      </Section>

      <Section>
        <></>
      </Section>
    </ColumnLayout>
  );
};