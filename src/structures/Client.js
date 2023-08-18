const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const mongoose = require("mongoose");
const Loader = require("./Loader");

class MahiroStudios extends Client {
  constructor() {
    super({
      failIfNotExists: true,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
      },
      intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
      ],
    });
    this.commands = new Collection();

    this.slashCommands = new Collection();
    this.config = require("../config/client.js");
    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.embedColor = this.config.embedColor;
    this.staffRole = this.config.staffRole;
    this.ticketsCategory = this.config.ticketsCategory;
    this.transcriptChannel = this.config.transcriptChannel;
    this.customActivity = this.config.customActivity;
    this.aliases = new Collection();
    this.commands = new Collection();
    this.logger = require("../utils/logger.js");
    if (!this.token) this.token = this.config.token;
    this.manager = new Loader(this);

    this.rest.on("rateLimited", (info) => { this.logger.log(info, "log"); });

		["slashCommand", "events"].forEach((handler) => { require(`../handlers/${handler}`)(this); });
  }
  
  connect() { return super.login(this.token); }

}

module.exports = MahiroStudios;
