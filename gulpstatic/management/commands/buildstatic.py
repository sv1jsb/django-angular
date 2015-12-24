# -*- coding: utf-8 -*-
import subprocess
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """
    Command that runs 'gulp build' as a first step and then calls
    django's collectstatic command ignoring the static/javascripts
    directory
    """
    help = "Run 'gulp build' then collectstatic ignoring static/javascripts"
    requires_system_checks = False

    def add_arguments(self, parser):
        parser.add_argument('--noinput',
            action='store_false', dest='interactive', default=True,
            help="Do NOT prompt the user for input of any kind.")
        parser.add_argument('--no-post-process',
            action='store_false', dest='post_process', default=True,
            help="Do NOT post process collected files.")
        parser.add_argument('-i', '--ignore', action='append', default=[],
            dest='ignore_patterns', metavar='PATTERN',
            help="Ignore files or directories matching this glob-style "
                "pattern. Use multiple times to ignore more.")
        parser.add_argument('-n', '--dry-run',
            action='store_true', dest='dry_run', default=False,
            help="Do everything except modify the filesystem.")
        parser.add_argument('-c', '--clear',
            action='store_true', dest='clear', default=False,
            help="Clear the existing files using the storage "
                 "before trying to copy or link the original file.")
        parser.add_argument('-l', '--link',
            action='store_true', dest='link', default=False,
            help="Create a symbolic link to each file instead of copying.")
        parser.add_argument('--no-default-ignore', action='store_false',
            dest='use_default_ignore_patterns', default=True,
            help="Don't ignore the common private glob-style patterns 'CVS', "
                "'.*' and '*~'.")

    def handle(self, *args, **options):
        subprocess.check_call(['gulp', 'build'])
        options['ignore_patterns'] += ['javascripts']
        call_command('collectstatic', *args, **options)
