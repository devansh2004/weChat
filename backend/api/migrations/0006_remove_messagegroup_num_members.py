# Generated by Django 5.1.3 on 2024-11-13 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_messagegroup_num_members'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='messagegroup',
            name='num_members',
        ),
    ]
