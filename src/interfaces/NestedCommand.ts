import Command from './Command';
import DiscordCommander from '../DiscordCommander';
import CommandData from './CommandData';
import MessageChecker from './MessageChecker';

class NestedCommand implements Command {
	name: string;
	altName?: string;
	description: string;
	easteregg?: boolean;
	exclusive?: boolean;
	commands: Map<string, Command> = new Map();
	messageCheckers: MessageChecker[] = [];
	execute(message: any, commander: DiscordCommander, commandData: CommandData): void {
		if (!this.check(message)) return;
		commandData.name = commandData.args[0];
		commandData.args = commandData.args.splice(1);
		this.rawCommand(message, commander, commandData);
	}
	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}
	rawCommand(message: any, commander: DiscordCommander, commandData: CommandData) {
		if (this.commands.get(commandData.name)) {
			const command: Command = this.commands.get(commandData.name);
			command.execute(message, commander, commandData);
			if (command.exclusive) return;
		}
	}
	check(message: any) {
		return !this.messageCheckers.find((checker) => {
			console.log('checker: ' + 'name: ' + checker.name + 'bool: ' + checker.predicate(message));
			return !checker.predicate(message);
		});
	}
	addCommand(command: Command) {
		this.commands.set(command.name, command);
		if (command.altName) this.commands.set(command.altName, command);
	}
	addChecker(checker: MessageChecker) {
		this.messageCheckers.push(checker);
	}
}

export default NestedCommand;
