/* 
Advanced Welcomer Discord Bot in Discord.js V14
Hope you Enjoy, Made with 💜 by Masih#0258
Github: https://github.com/Masihdev1 | Don't forget to ⭐
Website: https://masihdev.tk/
Copyright Masih 2024 All Right Reserved!
*/

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

client.on("guildMemberAdd", async (member) => {
  //Ignore the bots user
  if (member.user.bot) return;
  const WelcomeChannel = member.guild.channels.cache.get("CHANNEL_ID");
  const JoinRole = "ROLE_ID"
  const WelcomeInvitesLink = await WelcomeChannel.createInvite({
    maxAge: 10 * 60 * 1000,
    maxUses: 100,
  });
  //DM Welcomer
  const WelcomeDMEmbed = new EmbedBuilder()
    .setTitle(
      `Dear ${member.user.tag} Welcome to the **${
        member.guild.name
      }** [${member.guild.memberCount.toLocaleString()}]`
    )
    .setURL("https://masihdev.tk/")
    .setDescription(
      "Thanks for Joining us, We are so Excited to see you here, hope you enjoy and have great time to stay with us\n\nPlease visit our server and goodluck for hanging out with new cool people\n\nDon't Forget to check to following links button"
    )
    .setThumbnail(
      `${member.guild.iconURL({ dynamic: true, format: "png", size: 4096 })}`
    )
    .setColor(`${member.guild.members.me.displayHexColor}`)
    .setFooter({
      text: `${member.guild.name}`,
      iconURL: member.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 4096,
      }),
    })
    .setTimestamp();

  if (member.guild.bannerURL()) {
    WelcomeDMEmbed.setImage(
      member.guild.bannerURL({ dynamic: true, size: 4096, format: "png" })
    );
  }

  const WelcomeDMRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Channel1")
      .setEmoji("988331472614215680")
      .setURL("Channel Invite URL")
      .setStyle(ButtonStyle.Link),
    new ButtonBuilder()
      .setLabel("Channel2")
      .setEmoji("988331067062767627")
      .setURL(`Channel Invite URL`)
      .setStyle(ButtonStyle.Link),
    new ButtonBuilder()
      .setLabel("Channel3")
      .setEmoji("984238479493984275")
      .setURL("Channel Invite URL")
      .setStyle(ButtonStyle.Link),
    new ButtonBuilder()
      .setLabel("Channel4")
      .setEmoji("953427168392790056")
      .setURL("Channel Invite URL")
      .setStyle(ButtonStyle.Link)
  );

  member.send({
    content: `** ${WelcomeInvitesLink} **`,
    embeds: [WelcomeDMEmbed],
    components: [WelcomeDMRow],
  });
  //Welcome in the Specific channel
  const WelcomeEmbed = new EmbedBuilder()
    .setAuthor({
      name: `Hello ${member.user.tag} Welcome to the ${
        member.guild.name
      } [${member.guild.memberCount.toLocaleString()}]`,
      iconURL: `${member.user.displayAvatarURL({
        dynamic: true,
        size: 4096,
        format: "png",
      })}`,
    })

    .setColor(`${member.guild.members.me.displayHexColor}`)
    .setFooter({
      text: `ID: ${member.user.id}`,
      iconURL: member.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 4096,
      }),
    })
    .setTimestamp();

  const WelcomeRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Channel1")
      .setEmoji("988331472614215680")
      .setURL("Channel Invite URL")
      .setStyle(ButtonStyle.Link)
  );

  WelcomeChannel.send({
    content: `${member}`,
    embeds: [WelcomeEmbed],
    components: [WelcomeRow],
  })
    //Delete the content after 1 minutes
    .then((Welcome) => {
      setTimeout(function () {
        Welcome.delete();
      }, 60000);
    });
  member.roles.add(JoinRole)
});

client.on("ready", async () => {
  client.user.setPresence({
    //Also you can go for: online, dnd, invisible
    status: "idle",
  });
  console.log(`${client.user.username} is ready!`);
});

client.login("BOT_TOKEN");
