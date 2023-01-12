//Copyright (c) Masih#0258 2023 - 2024 All Right Reserved!

const { Client, Intents } = require("discord.js");

const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on("guildMemberAdd", async (member) => {
  const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");

  if (member.user.bot) return;
  const Guild = client.guilds.cache.get("GUILD_ID");
  const WelcomeChannel = member.guild.channels.cache.get("CHANNEL_ID");
  const WelcomeInvitesLink = await WelcomeChannel.createInvite({
    maxAge: 10 * 60 * 1000,
    maxUses: 100,
  });
  //DM Welcomer
  const WelcomeDMEmbed = new MessageEmbed()
    .setTitle(
      `Dear ${member.user.tag} Welcome to the **${member.guild.name}** [${member.guild.memberCount}]`
    )
    .setURL("https://masihdev.tk/")
    .setDescription(
      "Thanks for Joining us, We are so Excited to see you here, hope you enjoy and have great time to stay with us\n\nPlease visit our server and goodluck for hanging out with new cool people\n\nDon't Forget to check to following links button"
    )
    .setThumbnail(
      `${member.guild.iconURL({ dynamic: true, format: "png", size: 4096 })}`
    )
    .setColor(`${Guild.me.displayHexColor}`)
    .setFooter({
      text: `${member.guild.name}`,
      iconURL: member.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 4096,
      }),
    })
    .setTimestamp();

  const WelcomeDMRow = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Channel1")
      .setEmoji("988331472614215680")
      .setURL("https://discord.gg/6hGgxxZBVP")
      .setStyle("LINK"),
    new MessageButton()
      .setLabel("Channel2")
      .setEmoji("988331067062767627")
      .setURL(`https://discord.gg/MZxEQqkZZm`)
      .setStyle("LINK"),
    new MessageButton()
      .setLabel("Channel3")
      .setEmoji("984238479493984275")
      .setURL("https://discord.gg/95tbBpQSBr")
      .setStyle("LINK"),
    new MessageButton()
      .setLabel("Channel4")
      .setEmoji("953427168392790056")
      .setURL("https://discord.gg/hME7HRUn2u")
      .setStyle("LINK")
  );

  member.send({
    content: `** ${WelcomeInvitesLink} **`,
    embeds: [WelcomeDMEmbed],
    components: [WelcomeDMRow],
  });
  //Welcome in the Specific channel
  const WelcomeEmbed = new MessageEmbed()
    .setAuthor({
      name: `Hello ${member.user.tag} Welcome to the ${member.guild.name} [${member.guild.memberCount}]`,
      iconURL: `${member.user.avatarURL({
        dynamic: true,
        size: 4096,
        format: "png",
      })}`,
    })

    .setColor(`${Guild.me.displayHexColor}`)
    .setFooter({
      text: `ID: ${member.user.id}`,
      iconURL: member.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 4096,
      }),
    })
    .setTimestamp();

  const WelcomeRow = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Channel1")
      .setEmoji("988331472614215680")
      .setURL("https://discord.gg/6hGgxxZBVP")
      .setStyle("LINK")
  );

  WelcomeChannel.send({ embeds: [WelcomeEmbed], components: [WelcomeRow] })
    //Delete the content after 1 minutes
    .then((Welcome) => {
      setTimeout(function () {
        Welcome.delete();
      }, 60000);
    });
});

client.on("ready", async () => {
  client.user.setPresence({
    //Also you can go for: online, dnd, invisible
    status: "idle",
  });
  console.log(`${client.user.username} is ready!`);
});

client.login("BOT_TOKEN");
