from rest_framework import serializers
from .models import Movie, Review, Comment, Rank, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieListSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    user_picked = serializers.SerializerMethodField('user_valid', read_only=True)

    def user_valid(self, movie):
        user = self.context.get('user')
        if movie.picked.filter(pk=user.pk).exists():
            return True
        else:
            return False
    
    class Meta:
        model = Movie
        fields = ('id', 'title', 'overview', 'poster_path', 'genres', 'vote_average', 'vote_count', 'user_picked', 'trailer')

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rank
        fields = '__all__'
        read_only_fields = ('user', 'movie',)

class ReviewSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(source='like_users.count', read_only=True)
    rank = serializers.SerializerMethodField('rank_query', read_only=True)

    def rank_query(self, review):
        qs = Rank.objects.get(movie=review.movie, user=review.user)
        serializer = RankSerializer(instance=qs)
        return serializer.data['rank']

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'movie', 'like_users')

class CommentSerializer(serializers.ModelSerializer):
    user_flag = serializers.SerializerMethodField('user_valid', read_only=True)

    def user_valid(self, comment):
        user = self.context.get('user')
        if user == comment.user:
            return True
        else:
            return False

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'review',)

class ReviewDetailSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(source='like_users.count', read_only=True)
    rank = serializers.SerializerMethodField('rank_query', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    user_flag = serializers.SerializerMethodField('user_valid', read_only=True)

    def rank_query(self, review):
        qs = Rank.objects.get(movie=review.movie, user=review.user)
        serializer = RankSerializer(instance=qs)
        return serializer.data['rank']

    def user_valid(self, review):
        user = self.context.get('user')
        if user == review.user:
            return True
        else:
            return False
    

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'movie', 'like_users')

