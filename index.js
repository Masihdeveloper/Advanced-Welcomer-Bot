/* 
Advanced Welcomer Discord Bot in Discord.js V14
Hope you Enjoy, Made with 🤍 by Masih#0258
Github: https://github.com/Masihdeveloper | Don't forget to ⭐
Website: https://masihdev.ir/
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
const config = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("guildMemberAdd", async (member) => {
  //Ignore the bots user
  if (member.user.bot) return;
  const welcomeChannel = member.guild.channels.cache.get(
    config.welcomeChannelId
  );
  const welcomeInvitesLink = await welcomeChannel.createInvite({
    maxAge: 10 * 60 * 1000,
    maxUses: 100,
  });
  //DM Welcomer
  const welcomeDMEmbed = new EmbedBuilder()
    .setTitle(
      `Dear ${member.user.tag} Welcome to the **${
        member.guild.name
      }** [${member.guild.memberCount.toLocaleString()}]`
    )
    .setURL("https://masihdev.tk/")
    .setDescription(
      "Thanks for Joining us, We are so Excited to see you here, hope you enjoy and have great time to stay with us\n\nPlease visit our server and goodluck for hanging out with new cool people\n\nDon't Forget to check to following links button"
    )
    .setThumbnail(member.guild.iconURL({ size: 1024 }))
    .setColor(member.guild.members.me.displayHexColor)
    .setFooter({
      text: `${member.guild.name}`,
      iconURL: member.guild.iconURL({
        size: 1024,
      }),
    })
    .setTimestamp();

  if (member.guild.bannerURL()) {
    welcomeDMEmbed.setImage(
      member.guild.bannerURL({
        size: 1024,
      })
    );
  }

  const welcomeDMRow = new ActionRowBuilder().addComponents(
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
    content: `** ${welcomeInvitesLink} **`,
    embeds: [welcomeDMEmbed],
    components: [welcomeDMRow],
  });
  //Welcome in the Specific channel
  const welcomeEmbed = new EmbedBuilder()
    .setAuthor({
      name: `Hello ${member.user.tag} Welcome to the ${
        member.guild.name
      } [${member.guild.memberCount.toLocaleString()}]`,
      iconURL: member.user.displayAvatarURL({
        size: 1024,
      }),
    })

    .setColor(member.guild.members.me.displayHexColor)
    .setFooter({
      text: `ID: ${member.user.id}`,
      iconURL: member.guild.iconURL({
        size: 1024,
      }),
    })
    .setTimestamp();

  const welcomeRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Channel1")
      .setEmoji("988331472614215680")
      .setURL("Channel Invite URL")
      .setStyle(ButtonStyle.Link)
  );

  welcomeChannel
    .send({
      content: `${member}`,
      embeds: [welcomeEmbed],
      components: [welcomeRow],
    })
    //Delete the content after 1 minutes
    .then((Welcome) => {
      setTimeout(function () {
        Welcome.delete();
      }, 60000);
    });
  member.roles.add(config.welcomeRoleId);
});

client.on("ready", async () => {
  client.user.setPresence({
    //Also you can go for: online, dnd, invisible
    status: "idle",
  });
  console.log(`${client.user.username} is ready!`);
});

client.login(config.botToken);
