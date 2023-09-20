package fr.uga.laguidonette.domain;

public class ConfirmOrder {

    private String username;
    private String mail;
    private String commandId;
    private String name;
    private String local;

    public ConfirmOrder() {}

    public ConfirmOrder(String user, String mail, String commandId, String name, String local) {
        this.username = user;
        this.mail = mail;
        this.commandId = commandId;
        this.name = name;
        this.local = local;
    }

    /* * Getters and Setters * */

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getCommandId() {
        return commandId;
    }

    public void setCommandId(String commandId) {
        this.commandId = commandId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocale() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }
}
