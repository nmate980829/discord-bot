import DiscordCommander from '../DiscordCommander';

interface Mode {
	name: string;
	description: string;
	on: boolean;
	easteregg?: boolean;
	execute(message: any, discordCommander: DiscordCommander): void;
}

export default Mode;
