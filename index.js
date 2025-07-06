const { Client, GatewayIntentBits, Partials, Collection, Events, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const express = require('express');
const SQLite = require('better-sqlite3');
const fetch = require('node-fetch');
const config = require('./config.json');

// Fix pour ReadableStream si nécessaire
if (typeof ReadableStream === 'undefined') {
  const { ReadableStream } = require('web-streams-polyfill');
  global.ReadableStream = ReadableStream;
}

// Express server (pour Render ou uptime)
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(port, () => console.log(`Web server listening on port ${port}`));

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

// Initialisation des commandes
client.commands = new Collection();


// Load commands from ./commands
for (const file of commandFiles) {
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

// Database table creation
function initializeDatabase() {
  if (!sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='levels'`).get()['count(*)']) {
    sql.prepare(`CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER, totalXP INTEGER);`).run();
  }
  if (!sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='roles'`).get()['count(*)']) {
    sql.prepare(`CREATE TABLE roles (guildID TEXT, roleID TEXT, level INTEGER);`).run();
  }
  if (!sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='prefix'`).get()['count(*)']) {
    sql.prepare(`CREATE TABLE prefix (serverprefix TEXT, guild TEXT PRIMARY KEY);`).run();
  }

  client.getLevel = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
  client.setLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
}


client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
  
const activities = [
  { name: 'Uncle making tea', type: 3 },
  { name: '/help', type: 3 },
];

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  let currentIndex = 0;

  function updateActivity() {
    const activity = activities[currentIndex];
    client.user.setActivity(activity.name, { type: activity.type });
    currentIndex = (currentIndex + 1) % activities.length;
  }

  updateActivity();
  setInterval(updateActivity, 10000);
  initializeDatabase();
});


// Slash Command Handling
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (!command) return;

  try {
    await command.execute(interaction, sql);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
  }
});


function updateUserJSON(guildId) {
  if (!users.length) return;

    return {
      rank: index + 1,
      userId: entry.user,
      level: entry.level,
      xp: entry.xp,
      totalXP: entry.totalXP,
      nextXP
    };
  });

  fs.writeFileSync('./users.json', JSON.stringify(leaderboard, null, 2));
}


// Message-based XP System
client.on(Events.MessageCreate, async message => {
  if (message.author.bot || !message.guild) return;

  let level = client.getLevel.get(message.author.id, message.guild.id);
  if (!level) {
    sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (?, ?, ?, ?, ?, ?)").run(
      `${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, 0, 0, 0
    );
    return;
  }


  level.xp += xpGain;
  level.totalXP += xpGain;

  if (level.xp >= nextLevelXp) {
    level.xp -= nextLevelXp;
    level.level += 1;

  `🔥 ${message.author} reached **Level ${level.level}**... and honestly? That's one step closer to *finally* getting Dad to say "good job" — maybe.`,
  `🔥 **Level ${level.level}**?! Are you kidding me?! You're actually doing it! You’re… not a disappointment?!`,
  `🔥 ${message.author}, **Level ${level.level}**… You’re leveling up faster than my emotional damage.`,
  `🔥 I didn’t banish myself for *nothing!* Keep going. **Level ${level.level}**.`,
  `🔥 **Level ${level.level}**. That’s not just progress. That’s *growth*. Disgusting. I’m proud of you.`,
  `🔥 ${message.author}, you hit **Level ${level.level}** and no one even had to throw lightning at you. Impressive.`,
  `🔥 **Level ${level.level}**. Azula’s shaking in her boots. And they’re *very expensive* boots.`,
  `🔥 I spent *years* chasing the Avatar... you're out here chasing **Level ${level.level}** like it owes you money. Respect.`,
  `🔥 ${message.author}, you did not wake up and choose peace. You chose VIOLENCE. **Level ${level.level}**.`,
  `🔥 **Level ${level.level}**. You’ve burned through doubt, fear, and probably your eyebrows. Keep it up.`,
  `🔥 Listen... I used to think honor came from my father. But you? You just got it from **Level ${level.level}**. Even better.`,
  `🔥 ${message.author}, if I had a gold coin for every level you gained… I could finally open my own tea shop. **Level ${level.level}**.`,
  `🔥 **Level ${level.level}**. You’re on fire! Like literally. Are you okay? Is that smoke??`,
  `🔥 Wow. **Level ${level.level}**. I haven't been this surprised since Uncle Iroh told me tea wasn't dinner.`,
  `🔥 ${message.author}, you're hotter than blue fire right now! **Level ${level.level}** and rising!`,
  `🔥 **Level ${level.level}**. You've unlocked something powerful. Maybe... self-worth?! GASP.`,
  `🔥 You’ve come a long way from yelling at clouds. **Level ${level.level}** looks good on you.`,
  `🔥 **Level ${level.level}**. You didn’t find yourself — you *built* yourself. Like a firebender with IKEA instructions.`,
  `🔥 You’re not just leveling up, ${message.author}. You’re rewriting your whole redemption arc. **Level ${level.level}**!`,
  `🔥 Every level leaves a scar. But this one? This one looks kinda badass. Wear it proud. **Level ${level.level}**.`
];



message.reply(zukoMessage);



// Find matching role for the new level
if (matchingRole) {
  if (role && !member.roles.cache.has(role.id)) {
    // Remove all lower-level roles listed in the file
    for (const r of lowerRoles) {
      if (oldRole && member.roles.cache.has(oldRole.id)) {
        await member.roles.remove(oldRole).catch(console.error);
      }
    }

    await member.roles.add(role.id).catch(console.error);
    await message.author.send(`A secret message from my uncle: Congratulations my friend! You've reached **Level ${level.level}** and received the title **${role.name}**!`).catch(() => {});
  }
}

  }

  client.setLevel.run(level);
  updateUserJSON(message.guild.id);
  talkedRecently.set(message.author.id, Date.now() + 10 * 1000);
  setTimeout(() => talkedRecently.delete(message.author.id), 10 * 1000);
});

client.login(config.token);

// Commande intégrée depuis commands.js
const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('add-level')
    .setDescription('Give or add a level to a specified user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to give levels to')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Amount of levels to add')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const levelArgs = interaction.options.getInteger('amount');

    if (!user) {
      return interaction.reply({ content: 'Please specify a valid user.', ephemeral: true });
    }

    if (isNaN(levelArgs) || levelArgs < 1) {
      return interaction.reply({ content: 'Please provide a valid positive number.', ephemeral: true });
    }

    const getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
    const setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");

    let score = getScore.get(user.id, interaction.guild.id);
    if (!score) {
      score = {
        id: `${interaction.guild.id}-${user.id}`,
        user: user.id,
        guild: interaction.guild.id,
        xp: 0,
        level: 0,
        totalXP: 0
      };
    }

    score.level += levelArgs;
    const newTotalXP = (levelArgs - 1) * 2 * 250 + 250;
    score.totalXP += newTotalXP;

    setScore.run(score);

    const embed = new EmbedBuilder()
      .setTitle('✅ Success!')
      .setDescription(`Successfully added **${levelArgs}** level(s) to ${user.toString()}!`)
      .setColor('Random');

    return interaction.reply({ embeds: [embed] });
  }
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display help information for all commands or a specific command')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('Get detailed info about a specific command')
        .setRequired(false)
    ),

  async execute(interaction) {
    const input = interaction.options.getString('command');
    const commands = interaction.client.commands;

    if (!input) {
      const helpEmbed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({ name: `${interaction.guild.name} Help Menu`, iconURL: interaction.guild.iconURL() })
        .addFields(
          {
            name: 'Leveling Commands',
            value: '`/rank`, `/resetrank`, `/leaderboard`, `/role-level`, `/add-level`'
          },
          {
            name: 'Configuration Commands',
            value: '`/set-prefix`'
          }
        )
        .setTimestamp()
        .setFooter({ text: '<> is mandatory, [] is optional' });

      return interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }

    const name = input.toLowerCase();
    const command = commands.get(name);

    if (!command) {
      return interaction.reply({ content: `That’s not a valid command!`, ephemeral: true });
    }

    const detailsEmbed = new EmbedBuilder()
      .setTitle(command.data.name.charAt(0).toUpperCase() + command.data.name.slice(1))
      .setColor('Random')
      .setDescription([
        `**Command Name**: ${command.data.name}`,
        `**Description**: ${command.data.description || 'None'}`,
        `**Category**: ${command.category || 'General'}`,
        `**Aliases**: ${command.aliases ? command.aliases.join(', ') : 'None'}`,
        `**Cooldown**: ${command.cooldown || 'None'}`
      ].join('\n'))
      .setFooter({ text: 'Help command' });

    return interaction.reply({ embeds: [detailsEmbed], ephemeral: true });
  }
};
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Check top users with the most XP and the highest level'),

  async execute(interaction) {
    const top10 = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP DESC;").all(interaction.guild.id);

    if (top10.length < 1) {
      return interaction.reply({ content: 'The leaderboard is empty! Start earning XP to appear here.', ephemeral: true });
    }

    const totalPages = Math.ceil(top10.length / 10);
    let currentPage = 1;

const buildEmbed = async (page) => {
  const start = (page - 1) * 10;
  const end = start + 10;
  const pageData = top10.slice(start, end);

  const embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name} Server Ranking`)
    .setColor('Random')
    .setThumbnail('https://i.imghippo.com/files/YfWD3097aY.png')
    .setFooter({ text: `Page ${page} / ${totalPages}` })
    .setTimestamp();

  for (const [index, entry] of pageData.entries()) {
    const userId = entry.user;
    const nextXP = entry.level * 2 * 250 + 250;
    const rank = start + index + 1;

    let displayName;
    try {
      const member = await interaction.guild.members.fetch(userId).catch(() => null);
      displayName = member.displayName;
    } catch {
      displayName = `<@${userId}>`; // fallback to mention
    }

    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏅';

    embed.addFields({
      name: `${medal} ${rank}. ${displayName}`,
      value: `- **Level**: ${entry.level}\n- **XP**: ${entry.xp} / ${nextXP}`
    });
  }

  return embed;
};


    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('prev').setLabel('⬅️').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('next').setLabel('➡️').setStyle(ButtonStyle.Primary)
    );

    const message = await interaction.reply({
      embeds: [await buildEmbed(currentPage)],
      components: totalPages > 1 ? [row] : [],
      fetchReply: true,
      ephemeral: false
    });

    if (totalPages <= 1) return;

    const collector = message.createMessageComponentCollector({
      time: 60000,
      filter: i => i.user.id === interaction.user.id
    });

    collector.on('collect', async i => {
      if (i.customId === 'prev' && currentPage > 1) currentPage--;
      if (i.customId === 'next' && currentPage < totalPages) currentPage++;

      await i.update({
        embeds: [await buildEmbed(currentPage)],
        components: [row]
      });
    });

    collector.on('end', async () => {
      if (message.editable) {
        await message.edit({ components: [] });
      }
    });
  }
};const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require('discord.js');

const SENTENCES = [
  "Here's something for you!",
  "A moment captured in pixels.",
  "From the gallery with love.",
  "Smile! 📸",
];

const CHANNEL_ID = '1014249897756729454';
const ROLE_ID = '964096791178010635';
const OWNER_ID = '707124653482836009';

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('life-advice')
    .setDescription('Owner-only: Posts a provided photo URL to a specific channel.')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Direct image URL to post')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({ content: "❌ You don't have permission to use this command.", ephemeral: true });
    }

    const imageUrl = interaction.options.getString('url');
    const randomSentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];

    const targetChannel = await interaction.client.channels.fetch(CHANNEL_ID);
    if (!targetChannel || targetChannel.type !== 0) {
      return interaction.reply({ content: "❌ Target channel not found or invalid.", ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      await targetChannel.send({
        content: `<@&${ROLE_ID}> ${randomSentence}`,
        files: [{ attachment: imageUrl }]
      });

      return interaction.editReply({ content: "✅ Your photo has been sent to the channel!" });
    } catch (err) {
      console.error("Send failed:", err);
      return interaction.editReply({ content: "❌ Failed to send the photo." });
    }
  }
};const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('set-prefix')
    .setDescription('Set a custom server prefix for commands')
    .addStringOption(option =>
      option.setName('prefix')
        .setDescription('The new prefix to use')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const newPrefix = interaction.options.getString('prefix');
    const guildId = interaction.guild.id;

    const currentPrefix = sql.prepare("SELECT serverprefix FROM prefix WHERE guild = ?").get(guildId)?.serverprefix;

    if (!newPrefix) {
      return interaction.reply({ content: 'Please provide a new prefix.', ephemeral: true });
    }

    if (newPrefix === currentPrefix) {
      return interaction.reply({ content: 'That prefix is already in use. Please provide a new one.', ephemeral: true });
    }

    sql.prepare("INSERT OR REPLACE INTO prefix (serverprefix, guild) VALUES (?, ?);").run(newPrefix, guildId);

    return interaction.reply(`✅ Server prefix is now set to \`${newPrefix}\``);
  }
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription("Check a user's rank and XP")
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to check rank for')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getMember('user') || interaction.member;

      const getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
      const score = getScore.get(target.id, interaction.guild.id);

      if (!score) {
        return interaction.reply({ content: `${target.displayName} has no XP yet!`, ephemeral: true });
      }

      const topUsers = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP DESC").all(interaction.guild.id);
      const rank = topUsers.findIndex(u => u.user === target.id) + 1;

      const level = score.level;
      const nextXP = level * 2 * 250 + 250;

      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setAuthor({
          name: target.displayName || target.user.username,
          iconURL: target.displayAvatarURL({ dynamic: true })
        })
        .setTitle('🏅 Rank Information')
        .addFields(
          { name: 'Level', value: level.toString(), inline: true },
          { name: 'XP', value: `${score.xp} / ${nextXP}`, inline: true },
          { name: 'Rank', value: `#${rank}`, inline: true }
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({ text: `Server: ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error("An error occurred in the rank command:", error);
      interaction.reply({ content: "An error occurred while fetching the rank. Please try again later.", ephemeral: true });
    }
  }
};
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('remove-level')
    .setDescription('Remove or decrease level from a specified user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to remove levels from')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The number of levels to remove')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const levelToRemove = interaction.options.getInteger('amount');

    if (!user) {
      return interaction.reply({ content: 'Please mention a valid user.', ephemeral: true });
    }

    if (isNaN(levelToRemove) || levelToRemove < 1) {
      return interaction.reply({ content: 'Please provide a valid level amount to remove.', ephemeral: true });
    }

    const getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
    const setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");

    let score = getScore.get(user.id, interaction.guild.id);
    if (!score) {
      return interaction.reply({ content: 'This user does not have any XP or levels yet.', ephemeral: true });
    }

    if (score.level - levelToRemove < 1) {
      return interaction.reply({ content: 'You cannot remove levels that result in less than level 1.', ephemeral: true });
    }

    score.level -= levelToRemove;
    score.totalXP -= (levelToRemove - 1) * 2 * 250 + 250;
    setScore.run(score);

    const embed = new EmbedBuilder()
      .setTitle('✅ Success!')
      .setDescription(`Successfully removed **${levelToRemove}** level(s) from ${user.toString()}!`)
      .setColor('Random');

    return interaction.reply({ embeds: [embed] });
  }
};
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('resetrank')
    .setDescription('Resets the rank (level and XP) of everyone in the server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    try {
      // Reset all levels and XP
      const reset = sql.prepare("UPDATE levels SET xp = 0, level = 0, totalXP = 0 WHERE guild = ?");
      reset.run(guildId);

      // Optionally clean up zeroed entries
      const cleanup = sql.prepare("DELETE FROM levels WHERE guild = ? AND xp = 0 AND level = 0 AND totalXP = 0");
      cleanup.run(guildId);

      await interaction.reply('✅ All ranks in this server have been successfully reset!');
    } catch (error) {
      console.error("Error resetting ranks:", error);
      await interaction.reply({ content: '❌ There was an error resetting the ranks. Please try again later.', ephemeral: true });
    }
  }
};
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./mainDB.sqlite');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('role-level')
    .setDescription('Manage role rewards for specific levels')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles | PermissionFlagsBits.ManageGuild)
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Set a role to be rewarded at a specific level')
        .addIntegerOption(option =>
          option.setName('level')
            .setDescription('The level to assign the role')
            .setRequired(true))
        .addRoleOption(option =>
          option.setName('role')
            .setDescription('The role to assign')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a role reward at a specific level')
        .addIntegerOption(option =>
          option.setName('level')
            .setDescription('The level to remove the role reward from')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('show')
        .setDescription('Show all level-based role rewards')),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const guildId = interaction.guild.id;

    if (sub === 'add') {
      const level = interaction.options.getInteger('level');
      const role = interaction.options.getRole('role');

      if (level < 1) {
        return interaction.reply({ content: 'Please provide a valid level (1 or higher).', ephemeral: true });
      }

      const getRole = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?");
      const existing = getRole.get(guildId, level);

      const setRole = sql.prepare("INSERT OR REPLACE INTO roles (guildID, roleID, level) VALUES (?, ?, ?)");
      setRole.run(guildId, role.id, level);

      const action = existing ? 'updated' : 'set';
      const embed = new EmbedBuilder()
        .setTitle(`✅ Role ${action}`)
        .setDescription(`${role} has been ${action} for level ${level}.`)
        .setColor('Random');

      return interaction.reply({ embeds: [embed] });
    }

    if (sub === 'remove') {
      const level = interaction.options.getInteger('level');
      const getLevel = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?");
      const found = getLevel.get(guildId, level);

      if (!found) {
        return interaction.reply({ content: 'There is no role set for that level.', ephemeral: true });
      }

      const del = sql.prepare("DELETE FROM roles WHERE guildID = ? AND level = ?");
      del.run(guildId, level);

      const embed = new EmbedBuilder()
        .setTitle('✅ Role Removed')
        .setDescription(`Role reward for level ${level} has been removed.`)
        .setColor('Random');

      return interaction.reply({ embeds: [embed] });
    }

    if (sub === 'show') {
      const all = sql.prepare("SELECT * FROM roles WHERE guildID = ?").all(guildId);

      if (!all.length) {
        return interaction.reply({ content: 'There are no level-role rewards set in this server.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle(`${interaction.guild.name} Level Roles`)
        .setDescription('Use `/role-level add` to set new ones or `/role-level remove` to delete.')
        .setColor('Random');

      all.forEach(row => {
        embed.addFields({ name: `Level ${row.level}`, value: `<@&${row.roleID}>`, inline: true });
      });

      return interaction.reply({ embeds: [embed] });
    }
  }
};
const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

const addLevelCommand = {
    name: 'set-level',
    aliases: ['levelset'],
    category: "Leveling",
    description: "Set user Level and XP",
    cooldown: 3,
    async execute (message, args) {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let user = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0])

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`You do not have permission to use this command!`);

        const levelArgs = parseInt(args[1])

        client.getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
        client.setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
        if(!user) {
            return message.reply(`Please mention a user!`)
        } else {
            if(isNaN(levelArgs) || levelArgs < 1) {
                return message.reply(`Please provide a valid number!`)
            } else {
                let score = client.getScore.get(user.id, message.guild.id);
                if(!score) {
                    score = {
                        id: `${message.guild.id}-${user.id}`,
                        user: user.id,
                        guild: message.guild.id,
                        xp: 0,
                        level: 0,
                        totalXP: 0
                    }
                }
                score.level = levelArgs
                const newTotalXP = levelArgs - 1
                let embed = new Discord.MessageEmbed()
                .setTitle(`Success!`)
                .setDescription(`Successfully set ${levelArgs} level for ${user.toString()}!`)
                .setColor("RANDOM");
                score.totalXP = newTotalXP * 2 * 250 + 250
                score.xp = 0
                client.setScore.run(score)
                return message.channel.send(embed)
            }
        }
    }
}const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

const addLevelCommand = {
  data: new SlashCommandBuilder()
    .setName('zukoyoutube')
    .setDescription('Fetch the latest YouTube video from Uncle Iroh\'s channel'),

  async execute(interaction) {
    const apiKey = 'AIzaSyB0Xm35jREkbxfa4l7vpcJ4gOFXa4x1y2o'; // Replace with your YouTube API key
    const channelId = 'UC5VgXW1vFTnQCi5szh7R-qw'; // Replace with your channel ID
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.items || !data.items.length) {
        return interaction.reply('No recent videos found.');
      }

      const video = data.items[0];
      const videoId = video.id.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const introMessages = [
  "<@&964096937630498859> Uncle Iroh said something again. It’s probably deep. I guess you should watch it. 🔥",
  "<@&964096937630498859> I’m not saying he’s right *all the time*... but this one actually made sense. Check it out. 🍵",
  "<@&964096937630498859> Great. More Iroh wisdom. Because *clearly* we all need guidance or whatever. 🎴",
  "<@&964096937630498859> Uncle said this could help someone. So if you're a disaster like me, maybe it's for you. 🔥",
  "<@&964096937630498859> Iroh dropped another gem. He didn’t say it was optional. Just watch it. ✨",
  "<@&964096937630498859> Look, if ignoring him worked, I’d do it. It doesn’t. Here's the video. 🍵",
  "<@&964096937630498859> Iroh said you should watch this. I didn’t argue. I’ve learned my lesson. 🔥",
  "<@&964096937630498859> New Iroh wisdom just came in. I don’t *get* it yet... but maybe you will. 🎴",
  "<@&964096937630498859> He said this one was ‘important for your inner peace.’ Sounds like a trap. Click it. ✨",
  "<@&964096937630498859> Iroh keeps talking and somehow it keeps helping. Watch this before I change my mind. 🍵",
  "<@&964096937630498859> Another day, another life lesson from the old firebender. Don’t ignore it. Trust me. 🔥",
  "<@&964096937630498859> Uncle made me send this. Apparently *everyone* needs to hear it. Even you. ✨",
  "<@&964096937630498859> This video might just fix you. Or confuse you. Either way, Uncle said watch it. 🍵",
  "<@&964096937630498859> If you’ve messed something up recently, this might help. Iroh’s words, not mine. 🔥",
  "<@&964096937630498859> New wisdom update from the tea philosopher himself. You know what to do. ✨",
  "<@&964096937630498859> Don’t roll your eyes—it’s actually good. Iroh dropped another one. 🍵",
  "<@&964096937630498859> You don't have to listen to him... but why wouldn't you? He’s literally never wrong. 🔥",
  "<@&964096937630498859> This one's short but powerful. Kinda like the time Iroh made me cry over soup. Watch it. ✨",
  "<@&964096937630498859> Iroh’s been thinking again. The result? This. You’re welcome. 🍵",
  "<@&964096937630498859> Another quiet punch to the soul from Uncle Iroh. Watch it and feel things. 🔥",
  "<@&964096937630498859> Iroh said if I *don’t* send this, I’ll regret it. So here. Video. Now. ✨",
  "<@&964096937630498859> Even if you think you’ve got it all figured out, just… listen to Uncle. Trust me. 🍵",
  "<@&964096937630498859> This one's about peace or destiny or... something big. Just click it before I overthink. 🔥",
  "<@&964096937630498859> Uncle’s at it again. Dropping advice like it’s hot tea. Try not to spill it. ✨",
  "<@&964096937630498859> Not everything he says makes sense at first. But this? This one hit different. Watch it. 🍵"
      ];
      const intro = introMessages[Math.floor(Math.random() * introMessages.length)];

      const embed = new EmbedBuilder()
        .setTitle(video.snippet.title)
        .setDescription(video.snippet.description || 'No description provided.')
        .setURL(videoUrl)
        .setImage(video.snippet.thumbnails.high.url)
        .setColor('#FF0000')
        .setTimestamp();

      await interaction.reply(intro);
      await interaction.followUp({ embeds: [embed] });

      // Send reminder to another channel
      const reminderChannelId = '1014249897756729454';
      const reminderChannel = interaction.guild.channels.cache.get(reminderChannelId);
      if (reminderChannel) {
        reminderChannel.send("✍️ Hey <@707124653482836009>, don't forget to write a <#1103963545978273842> today. Uncle would be proud.");
      }

    } catch (err) {
      console.error('YouTube API error:', err);
      return interaction.reply({ content: '❌ Could not fetch the video. Please try again later.', ephemeral: true });
    }
  }
};


// Initialiser la collection des commandes si ce n’est pas déjà fait
if (!client.commands) client.commands = new Collection();
client.commands.set(addLevelCommand.data.name, addLevelCommand);

// Gérer les interactions pour SlashCommands
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});
