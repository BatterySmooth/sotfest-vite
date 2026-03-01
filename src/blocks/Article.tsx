import { Theme } from "@core/Theme";
import { SocialLinks } from "@blocks/SocialLinks";
import { LinkButton } from "@components/LinkButton";
import { SectionHeader } from "@components/SectionHeader";
import { ColumnLayout } from "@components/ColumnLayout";
import { Section } from "@components/Section";
import style from './Article.module.css';
import TicketIcon from "@icons/ticket.svg?react";
import TShirtIcon from "@icons/tshirt.svg?react";

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
            Icon={TicketIcon}
            theme={Theme.Secondary}
            rotation={5}
          />
          <LinkButton
            className={style.ticketButton}
            href="https://sotfest.myspreadshop.co.uk/"
            text="Merch"
            Icon={TShirtIcon}
            theme={Theme.Parimary}
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