import Command from "./interfaces/Command";
import Mode from "./interfaces/Mode";
import Interpreter from "./interfaces/Interpreter";
import CommandData from './interfaces/CommandData';
import MessageChecker from "./interfaces/MessageChecker";

class DiscordCommander{
	commands: Map<string, Command>;
	modes: Map<string, Mode>;
	interpreters: Interpreter[];
	messageCheckers: MessageChecker[];
	state: any;
	message(message: any) { 
		this.check(message);
		this.rawCommand(message);
		this.rawMode(message);
		this.rawInterpreter(message);
	}
	command(message: any) { 
		this.check(message);
		this.rawCommand(message);
	}
	mode(message: any) {
		this.check(message);
		this.rawMode(message);
	}
	interpreter(message: any) { 
		this.check(message);
		this.rawInterpreter(message);
		
	}
	check(message: any) { 
		this.messageCheckers.map(checker => {
			if (!checker.predicate(message))
				return;
		});
	}
	rawCommand(message: any) { 
		if (this.isCommand(message.content)) {
			const commandData: CommandData = this.commandParser(message.content); 
			if (this.commands.has(commandData.name)) {
				const command: Command = this.commands[commandData.name];
				command.execute(message, this, commandData);
				if (command.exclusive)
					return;
			}
		}
	}
	rawMode(message: any) { 
		this.modes.forEach( value => {
			if (value.on)
				value.execute(message, this);
		});
	}
	rawInterpreter(message: any) { 
		this.interpreters.map(value => { 
			if (value.predicate(message)) { 
				value.execute(message, this);
			}
		});	
	}
	addCommand(command: Command) { 
		this.commands[command.name] = command;
		if (command.altName)
			this.commands[command.altName] = command;
	}
	addMode(mode: Mode) {
		this.modes[mode.name] = mode;
	}
	addInterpreter(interpreter: Interpreter) { 
		this.interpreters.push(interpreter);
	}
	addChecker(checker: MessageChecker) { 
		this.messageCheckers.push(checker);
	}
	commandParser(content: string): CommandData { 
		var args = content.substring(1).split(' ');
        var name = args[0];
		args = args.splice(1);
		return {
			name,
			args
		};
	}
	isCommand(content: string): boolean { 
		return (content.substring(0, 1) == '!');
	}
};
export default DiscordCommander;