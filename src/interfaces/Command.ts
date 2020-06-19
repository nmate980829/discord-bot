import DiscordCommander from "../DiscordCommander";
import CommandData from "./CommandData";

interface Command {
	name: string,
	altName?: string,
	description: string,
	easteregg?: boolean,
	exclusive?: boolean
	execute(message: any, commander: DiscordCommander, commandData: CommandData): void
};

export default Command;