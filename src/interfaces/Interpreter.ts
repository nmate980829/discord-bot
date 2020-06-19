import DiscordCommander from '../DiscordCommander';

interface Interpreter{
	name: string,
	description: string,
	predicate(content: string): boolean,
	execute(message: any, discordCommander: DiscordCommander): void
};

export default Interpreter;