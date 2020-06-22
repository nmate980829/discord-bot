interface MessageChecker {
	name: string;
	descrition: string;
	predicate(message: any): boolean;
}

export default MessageChecker;
