# Generated by Django 5.1.3 on 2024-11-13 10:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_appuser_options_alter_appuser_managers_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AppUser',
        ),
    ]
